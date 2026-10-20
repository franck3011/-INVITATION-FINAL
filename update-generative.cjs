const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "components", "generative-layout.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Generate import statements for 101 to 300
let newImports = "";
for (let i = 101; i <= 300; i += 10) {
  const end = i + 9;
  const items = [];
  for (let j = i; j <= end; j++) {
    items.push("Design" + j);
  }
  newImports +=
    "import { " +
    items.join(", ") +
    ' } from "./designs/layout-' +
    String(i).padStart(3, "0") +
    "-" +
    String(end).padStart(3, "0") +
    '";\n';
}

// Generate array items
let newArrayItems = "";
for (let i = 101; i <= 300; i++) {
  newArrayItems += "Design" + i + ", ";
}

// Inject new imports before `export type { GenerativeProps };`
if (!content.includes("Design101")) {
  content = content.replace(
    "export type { GenerativeProps };",
    newImports + "\nexport type { GenerativeProps };",
  );

  // Inject array items into DESIGNS array
  content = content.replace("Design100\n]", "Design100,\n  " + newArrayItems + "\n]");

  fs.writeFileSync(filePath, content, "utf8");
  console.log("generative-layout.tsx updated successfully!");
} else {
  console.log("Already updated.");
}
