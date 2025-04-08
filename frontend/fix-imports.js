// fix-imports.js
const fs = require("fs");
const path = require("path");

const directory = "src";
const regex = /@\/src\//g;

function scanAndFixImports(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanAndFixImports(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, "utf8");
      if (content.includes("@/src/")) {
        const fixedContent = content.replace(regex, "@/");

        fs.writeFileSync(fullPath, fixedContent);
        console.log(`✔️ Corrigé : ${fullPath}`);
      }
    }
  });
}

console.log("🔧 Correction des chemins '@/src/...' → '@/...' en cours...");
scanAndFixImports(directory);
console.log("✅ Terminé !");
