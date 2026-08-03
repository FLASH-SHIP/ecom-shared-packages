import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_PATH = path.resolve(__dirname, '../src/tokens/tokens.json');
const STYLES_PATH = path.resolve(__dirname, '../src/styles.css');

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function validateOklchColor(colorStr: string, name: string): string | null {
  if (!colorStr.startsWith('oklch(')) {
    return null; // hex or var reference is allowed
  }
  const match = colorStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/);
  if (!match) {
    return `Color "${name}" has invalid OKLCH syntax: "${colorStr}"`;
  }
  const parts = match.slice(1, 4).map(Number);
  const l = parts[0];
  const c = parts[1];
  const h = parts[2];
  if (l === undefined || isNaN(l) || l < 0 || l > 1) return `Color "${name}" Lightness (${l}) out of range [0, 1]`;
  if (c === undefined || isNaN(c) || c < 0 || c > 0.4) return `Color "${name}" Chroma (${c}) out of expected range [0, 0.4]`;
  if (h === undefined || isNaN(h) || h < 0 || h > 360) return `Color "${name}" Hue (${h}) out of range [0, 360]`;
  return null;
}

function validateTokens(): ValidationResult {
  const errors: string[] = [];

  if (!fs.existsSync(TOKENS_PATH)) {
    return { valid: false, errors: [`Tokens file not found at ${TOKENS_PATH}`] };
  }

  let tokens: any;
  try {
    tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'));
  } catch (err: any) {
    return { valid: false, errors: [`JSON Parse Error: ${err.message}`] };
  }

  // Validate colors
  if (tokens.color) {
    for (const [key, item] of Object.entries<any>(tokens.color)) {
      const val = item.$value || item.value;
      if (typeof val === 'string') {
        const err = validateOklchColor(val, key);
        if (err) errors.push(err);
      }
    }
  } else {
    errors.push('Missing "color" top-level node in tokens.json');
  }

  // Validate typography
  if (!tokens.typography) {
    errors.push('Missing "typography" top-level node in tokens.json');
  }

  // Validate styles.css exists
  if (!fs.existsSync(STYLES_PATH)) {
    errors.push(`styles.css missing at ${STYLES_PATH}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function run() {
  console.log('🔍 Validating Design System Tokens...');
  const result = validateTokens();

  if (!result.valid) {
    console.error('❌ Token Validation Failed with the following errors:');
    result.errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('✅ Token Validation Passed Cleanly!');
}

run();
