const fs = require("fs");
let content = fs.readFileSync("src/components/designs/layout-01-12.tsx", "utf8");

content = content.replace(
  /<InlineTextEditor \n\s*isBuilder={isBuilder} \n\s*themeKey="Subtitle" \n\s*currentFontSize={null}/g,
  `<InlineTextEditor \n              isBuilder={isBuilder} \n              themeKey="Subtitle" \n              currentFontSize={themeOverrides?.fontSizeSubtitle ?? null}`
);

content = content.replace(
  /className={\`\$\{getFontClass\(themeOverrides\?\.fontSubtitle, 'font-display'\)\} text-\[clamp\(1rem,4vw,1\.125rem\)\]\`}/g,
  `className={\`\${getFontClass(themeOverrides?.fontSubtitle, 'font-display')}\`}`
);

content = content.replace(
  /style={{ color: p\.accent, fontWeight: p\.subtitleBold \? 700 : undefined }}/g,
  `style={{ color: p.accent, fontWeight: p.subtitleBold ? 700 : undefined, fontSize: themeOverrides?.fontSizeSubtitle ? \`\${themeOverrides.fontSizeSubtitle}px\` : "clamp(1rem,4vw,1.125rem)" }}`
);

content = content.replace(
  /<span style={{ color: p\.rule }}>•<\/span>/g,
  `<span style={{ color: p.rule, fontSize: themeOverrides?.fontSizeSubtitle ? \`\${Math.max(10, themeOverrides.fontSizeSubtitle - 4)}px\` : undefined }}>•</span>`
);

content = content.replace(
  /className={\`\$\{getFontClass\(themeOverrides\?\.fontSubtitle, ''\)\} text-\[11px\]\`}/g,
  `className={\`\${getFontClass(themeOverrides?.fontSubtitle, '')}\`}`
);

content = content.replace(
  /style={{ color: p\.sub, fontWeight: p\.subtitleBold \? 700 : undefined }}/g,
  `style={{ color: p.sub, fontWeight: p.subtitleBold ? 700 : undefined, fontSize: themeOverrides?.fontSizeSubtitle ? \`\${Math.max(10, themeOverrides.fontSizeSubtitle - 4)}px\` : "11px" }}`
);

fs.writeFileSync("src/components/designs/layout-01-12.tsx", content);
