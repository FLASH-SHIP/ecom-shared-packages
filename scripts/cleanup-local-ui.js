const fs = require("fs");
const path = require("path");

const ROOT_DIR = "/Users/tuandang/Data/FlashShip/ecom-express";

// Files to keep in ecom-admin/src/components/ui
const KEEP_ADMIN = new Set([
  "RichTextEditor.tsx",
  "ConfirmDialog.tsx",
  "AddFromUrlDialog.tsx",
  "SearchInput.tsx",
  "useAddFromUrl.ts",
  "useConfirm.ts"
]);

function cleanupDir(appDir, isAdmin = false) {
  const uiDir = path.join(ROOT_DIR, appDir, "src/components/ui");
  if (!fs.existsSync(uiDir)) return;

  const entries = fs.readdirSync(uiDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(uiDir, entry.name);
    if (isAdmin && KEEP_ADMIN.has(entry.name)) {
      console.log(`Kept admin-specific file: ${entry.name}`);
      continue;
    }
    if (entry.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Removed dir: ${path.relative(ROOT_DIR, fullPath)}`);
    } else if (entry.isFile()) {
      fs.unlinkSync(fullPath);
      console.log(`Removed file: ${path.relative(ROOT_DIR, fullPath)}`);
    }
  }
}

console.log("Cleaning up duplicated local UI proxy files...");
cleanupDir("ecom-web", false);
cleanupDir("ecom-customer", false);
cleanupDir("ecom-admin", true);
console.log("Cleanup completed.");
