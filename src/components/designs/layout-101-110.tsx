import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 101: Wedding Elegance 101
export function Design101({
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

// 102: Wedding Elegance 102
export function Design102({
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

// 103: Wedding Elegance 103
export function Design103({
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

// 104: Wedding Elegance 104
export function Design104({
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

// 105: Wedding Elegance 105
export function Design105({
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
      <div className="w-[80%] mx-auto aspect-[3/4] absolute top-10 right-10 shadow-2xl z-0 rounded-sm overflow-hidden">
        <img src={coverImageUrl} className="w-full h-full object-cover opacity-90" alt="" />
      </div>

      <div className="flex-1 flex flex-col justify-end pb-10">
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

// 106: Wedding Elegance 106
export function Design106({
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
        <div className="w-full aspect-video mb-8 shadow-lg">
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

// 107: Wedding Elegance 107
export function Design107({
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
        <div className="w-full aspect-[3/4] rounded-t-[120px] overflow-hidden mb-8 shadow-inner border-b-4 border-[#e8e2d5]">
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

// 108: Wedding Elegance 108
export function Design108({
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
        <div className="w-full aspect-[4/5] overflow-hidden mb-8 shadow-sm">
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

// 109: Wedding Elegance 109
export function Design109({
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
        <div className="w-full h-64 overflow-hidden mb-8 rounded-b-full shadow-md border-b border-[#f0ebe1]">
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

// 110: Wedding Elegance 110
export function Design110({
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
        <div className="w-full flex-1 mb-8 overflow-hidden border border-[#f0ebe1]">
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
