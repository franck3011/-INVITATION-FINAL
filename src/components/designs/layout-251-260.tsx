import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 251: Wedding Elegance 251
export function Design251({
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

// 252: Wedding Elegance 252
export function Design252({
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

// 253: Wedding Elegance 253
export function Design253({
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

// 254: Wedding Elegance 254
export function Design254({
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

// 255: Wedding Elegance 255
export function Design255({
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
        <div className="w-[85%] mx-auto aspect-[4/5] bg-white p-2 shadow-xl mb-10 transform -rotate-2">
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

// 256: Wedding Elegance 256
export function Design256({
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
        <div className="w-[90%] mx-auto aspect-square rounded-full overflow-hidden mb-10 shadow-md border-4 border-white">
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

// 257: Wedding Elegance 257
export function Design257({
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

// 258: Wedding Elegance 258
export function Design258({
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

// 259: Wedding Elegance 259
export function Design259({
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

// 260: Wedding Elegance 260
export function Design260({
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
