const fs = require("fs");
let content = fs.readFileSync("src/components/designs/layout-01-12.tsx", "utf8");

content = content.replace(/currentBgColor=\{themeOverrides\?\.bgActionRSVPText \?\? null\}/g, `currentBgColor={themeOverrides?.bgActionRSVPText ?? null}\n              currentPadding={themeOverrides?.paddingActionRSVPText ?? null}\n              currentHidden={themeOverrides?.hideActionRSVPText ?? false}`);

// Remove static vertical paddings (py-2, py-2.5, py-3) from RSVP buttons
content = content.replace(/ py-2 /g, " ");
content = content.replace(/ py-2\.5 /g, " ");
content = content.replace(/ py-3 /g, " ");

// Add padding inline style to the ActionRSVPText
content = content.replace(/fontSize: themeOverrides\?\.fontSizeActionRSVPText \? \`\\\$\\{themeOverrides\.fontSizeActionRSVPText\\}px\` : "([^"]+)" \}\}/g, `fontSize: themeOverrides?.fontSizeActionRSVPText ? \`\${themeOverrides.fontSizeActionRSVPText}px\` : "$1", padding: themeOverrides?.paddingActionRSVPText != null ? \`\${themeOverrides.paddingActionRSVPText}px 0\` : "12px 0" }}`);

fs.writeFileSync("src/components/designs/layout-01-12.tsx", content);
console.log("Updated layout-01-12.tsx");

