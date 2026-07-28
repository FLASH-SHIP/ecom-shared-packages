const fs = require("fs");
const path = require("path");

const ROOT_DIR = "/Users/tuandang/Data/FlashShip/ecom-express";
const TARGET_APPS = ["ecom-web", "ecom-customer", "ecom-admin"];

// App-specific admin files that stay local in ecom-admin
const KEEP_LOCAL_ADMIN_FILES = new Set([
  "RichTextEditor",
  "ConfirmDialog",
  "AddFromUrlDialog",
  "SearchInput",
  "useAddFromUrl",
  "useConfirm"
]);

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // 1. LanguageSwitcher & PhoneInput -> @flash-ship/ecom-ui/domain
  content = content.replace(
    /from\s+["']@(?:web|customer|admin)?(?:\/src)?\/components\/ui\/language-switcher["']/g,
    'from "@flash-ship/ecom-ui/domain"'
  );
  content = content.replace(
    /from\s+["']@(?:web|customer|admin)?(?:\/src)?\/components\/ui\/PhoneInput["']/g,
    'from "@flash-ship/ecom-ui/domain"'
  );

  // 2. Specific component subpath imports -> @flash-ship/ecom-ui
  // e.g. from "@/components/ui/button" or "@customer/components/ui/dialog"
  content = content.replace(
    /from\s+["']@(?:web|customer|admin)?(?:\/src)?\/components\/ui\/([a-zA-Z0-9_-]+)["']/g,
    (match, componentName) => {
      if (KEEP_LOCAL_ADMIN_FILES.has(componentName)) {
        return match; // keep local import
      }
      return 'from "@flash-ship/ecom-ui"';
    }
  );

  // 3. Import cn helper -> @flash-ship/ecom-ui
  content = content.replace(
    /from\s+["']@(?:web|customer|admin)?(?:\/src)?\/lib\/utils["']/g,
    'from "@flash-ship/ecom-ui"'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated imports: ${path.relative(ROOT_DIR, filePath)}`);
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== "dist") {
        traverse(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      processFile(fullPath);
    }
  }
}

console.log("Starting UI import migration script...");
for (const app of TARGET_APPS) {
  const appPath = path.join(ROOT_DIR, app, "src");
  if (fs.existsSync(appPath)) {
    console.log(`Processing ${app}...`);
    traverse(appPath);
  }
}
console.log("UI import migration script completed successfully.");
