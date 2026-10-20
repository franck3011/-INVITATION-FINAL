import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 221: Wedding Elegance 221
export function Design221({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] shadow-xl relative overflow-hidden flex flex-col bg-[#fcfdfa]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full aspect-[4/5] bg-[#fbfbf9] mb-8 border border-[#e8e2d5] p-2 shadow-inner">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-left w-full pl-6 border-l border-[#e8e2d5] relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 222: Wedding Elegance 222
export function Design222({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-sm flex flex-col justify-center relative bg-white"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-[80%] mx-auto aspect-[3/4] absolute top-10 right-10 shadow-2xl z-0 rounded-sm overflow-hidden">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="flex-1 flex flex-col justify-end pb-10">
        <div className="text-center w-full relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 223: Wedding Elegance 223
export function Design223({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] shadow-xl relative overflow-hidden flex flex-col bg-[#fcfaf8]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full aspect-video mb-8 shadow-lg">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-center w-full relative z-10 mt-auto">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 224: Wedding Elegance 224
export function Design224({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-sm flex flex-col justify-center relative bg-[#fdfdfd]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full aspect-[3/4] rounded-t-[120px] overflow-hidden mb-8 shadow-inner border-b-4 border-[#e8e2d5]">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-center w-full bg-white p-8 border border-[#f0ebe1] shadow-sm relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 225: Wedding Elegance 225
export function Design225({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] shadow-xl relative overflow-hidden flex flex-col bg-[#f8f7f5]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full aspect-[4/5] overflow-hidden mb-8 shadow-sm">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90" alt="" />
        </div>

        <div className="text-center w-[95%] mx-auto bg-white/90 backdrop-blur-md p-6 shadow-lg border border-white/50 relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 226: Wedding Elegance 226
export function Design226({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-sm flex flex-col justify-center relative bg-[#fdfaf5]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full h-64 overflow-hidden mb-8 rounded-b-full shadow-md border-b border-[#f0ebe1]">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-right w-full pr-6 border-r border-[#e8e2d5] relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 227: Wedding Elegance 227
export function Design227({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] shadow-xl relative overflow-hidden flex flex-col bg-[#fcfdfa]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full flex-1 mb-8 overflow-hidden border border-[#f0ebe1]">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-left w-full pl-6 border-l border-[#e8e2d5] relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 228: Wedding Elegance 228
export function Design228({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-sm flex flex-col justify-center relative bg-white"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-[85%] mx-auto aspect-[4/5] bg-white p-2 shadow-xl mb-10 transform -rotate-2">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-center w-full relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 229: Wedding Elegance 229
export function Design229({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] shadow-xl relative overflow-hidden flex flex-col bg-[#fcfaf8]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-[90%] mx-auto aspect-square rounded-full overflow-hidden mb-10 shadow-md border-4 border-white">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="text-center w-full relative z-10 mt-auto">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 230: Wedding Elegance 230
export function Design230({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-sm flex flex-col justify-center relative bg-[#fdfdfd]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full aspect-[4/5] bg-[#fbfbf9] mb-8 border border-[#e8e2d5] p-2 shadow-inner">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90" alt="" />
        </div>

        <div className="text-center w-full bg-white p-8 border border-[#f0ebe1] shadow-sm relative z-10">
          {hostName && (
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a09a8f] mb-4 font-sans">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-6 leading-[1.1]`}
          >
            {template.name}
          </h2>

          <div className="flex justify-center items-center gap-4 text-xs font-serif italic text-[#6b665c] border-t border-[#ebe6dc] pt-5 mt-5">
            <p>
              {dt.day} {dt.month}
            </p>
            <span className="w-1 h-1 bg-[#dcd7cd] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
