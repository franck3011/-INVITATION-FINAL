const fs = require("fs");
let content = fs.readFileSync("src/components/inline-editor.tsx", "utf8");

content = content.replace(
  /onClick={\(e\) => \{\s+e\.preventDefault\(\);\s+e\.stopPropagation\(\);\s+\}\}/g,
  `onClick={(e) => e.stopPropagation()}`
);

fs.writeFileSync("src/components/inline-editor.tsx", content);

