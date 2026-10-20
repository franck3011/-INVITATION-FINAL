const fs = require("fs");
let content = fs.readFileSync("src/components/designs/layout-01-12.tsx", "utf8");

// Remove w-full from all ActionRSVPText buttons
content = content.replace(/ w-full /g, " inline-block px-8 ");
content = content.replace(/w-full rounded-full/g, "inline-block rounded-full");
content = content.replace(/w-full py-3/g, "inline-block");
content = content.replace(/w-full py-4/g, "inline-block");

// Actually, wait, there might be other things with w-full. Let us be more specific.

