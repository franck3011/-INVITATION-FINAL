const fs = require("fs");
const path = require("path");

const NUM_DESIGNS = 200;
const START_INDEX = 101;
const BATCH_SIZE = 10;
const OUTPUT_DIR = path.join(__dirname, "src", "components", "designs");

// Aesthetic rules & variations for Weddings
const bgs = [
  "bg-white",
  "bg-[#fcfaf8]",
  "bg-[#fdfdfd]",
  "bg-[#f8f7f5]",
  "bg-[#fdfaf5]",
  "bg-[#fcfdfa]",
];
const wrappers = [
  "mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-sm flex flex-col justify-center relative",
  "mx-auto w-full max-w-sm min-h-[85vh] p-6 shadow-md border border-[#f0ebe1] flex flex-col relative",
  "mx-auto w-full max-w-sm min-h-[85vh] p-10 shadow-lg flex flex-col justify-between text-center relative",
  "mx-auto w-full max-w-sm min-h-[85vh] shadow-xl relative overflow-hidden flex flex-col",
  "mx-auto w-full max-w-sm min-h-[85vh] p-4 border-[12px] border-[#f0ebe1] flex flex-col items-center bg-white relative",
  "mx-auto w-full max-w-sm min-h-[85vh] p-6 border-x-8 border-t-8 border-[#f4f0e6] bg-[#fbfbf9] shadow-inner relative",
];
const imgContainers = [
  "w-full aspect-[4/5] overflow-hidden mb-8 shadow-sm",
  "w-[90%] mx-auto aspect-square rounded-full overflow-hidden mb-10 shadow-md border-4 border-white",
  "w-full aspect-[3/4] rounded-t-[120px] overflow-hidden mb-8 shadow-inner border-b-4 border-[#e8e2d5]",
  "w-[85%] mx-auto aspect-[4/5] bg-white p-2 shadow-xl mb-10 transform -rotate-2",
  "w-full aspect-video mb-8 shadow-lg",
  "w-full flex-1 mb-8 overflow-hidden border border-[#f0ebe1]",
  "w-[80%] mx-auto aspect-[3/4] absolute top-10 right-10 shadow-2xl z-0 rounded-sm overflow-hidden",
  "w-full h-64 overflow-hidden mb-8 rounded-b-full shadow-md border-b border-[#f0ebe1]",
  "w-full aspect-[4/5] bg-[#fbfbf9] mb-8 border border-[#e8e2d5] p-2 shadow-inner",
];
const textLayouts = [
  "text-center w-full relative z-10",
  "text-left w-full pl-6 border-l border-[#e8e2d5] relative z-10",
  "text-right w-full pr-6 border-r border-[#e8e2d5] relative z-10",
  "text-center w-[95%] mx-auto bg-white/90 backdrop-blur-md p-6 shadow-lg border border-white/50 relative z-10",
  "text-center w-full bg-white p-8 border border-[#f0ebe1] shadow-sm relative z-10",
  "text-center w-full relative z-10 mt-auto",
];

function generateComponent(index) {
  const bg = bgs[index % bgs.length];
  const wrapper = wrappers[(index * 3) % wrappers.length];
  const imgCont = imgContainers[(index * 7) % imgContainers.length];
  const textLay = textLayouts[(index * 11) % textLayouts.length];

  const hasAbsoluteImg = imgCont.includes("absolute");
  const imgClass = "w-full h-full object-cover" + (index % 5 === 0 ? " opacity-90" : "");
  const containerFlex = hasAbsoluteImg
    ? "flex-1 flex flex-col justify-end pb-10"
    : "flex-1 flex flex-col justify-center";

  return `
// ${index}: Wedding Elegance ${index}
export function Design${index}({ template, coverImageUrl, hostName, eventDate, themeOverrides }: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
      className="${wrapper} ${bg}"
      style={{ ...fontVars(template, themeOverrides) }}>
      
      ${hasAbsoluteImg ? `<div className="${imgCont}"><img src={coverImageUrl} className="${imgClass}" alt="" /></div>` : ""}

      <div className="${containerFlex}">
        ${!hasAbsoluteImg ? `<div className="${imgCont}"><img src={coverImageUrl} className="${imgClass}" alt="" /></div>` : ""}
        
        <div className="${textLay}">
          {hostName && <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">{hostName}</p>}
          <h2 className={\`\${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]\`}>{template.name}</h2>
          
          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>{dt.day} {dt.month}</p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
`;
}

function generateBatch(startIndex, endIndex) {
  let content = `import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";\n`;

  for (let i = startIndex; i <= endIndex; i++) {
    content += generateComponent(i);
  }

  const filename =
    "layout-" +
    String(startIndex).padStart(3, "0") +
    "-" +
    String(endIndex).padStart(3, "0") +
    ".tsx";
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), content, "utf8");
  console.log("Generated " + filename);
}

for (let i = 0; i < NUM_DESIGNS / BATCH_SIZE; i++) {
  const start = START_INDEX + i * BATCH_SIZE;
  const end = start + BATCH_SIZE - 1;
  generateBatch(start, end);
}
