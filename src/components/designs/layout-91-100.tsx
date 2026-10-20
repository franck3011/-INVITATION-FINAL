import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 91: Elegant Diagonal
export function Design91({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white relative overflow-hidden shadow-xl"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute -top-[20%] -right-[20%] w-[140%] h-[60%] bg-gray-50 transform rotate-[-15deg] shadow-lg">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover transform rotate-[15deg] scale-150 origin-bottom-left "
          alt=""
        />
      </div>
      <div className="absolute bottom-10 left-8 right-8 bg-white/95 backdrop-blur-sm p-8 shadow-2xl border border-gray-100 text-center">
        {hostName && (
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] mb-4">
            {hostName}
          </p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 mb-6`}
        >
          {template.name}
        </h2>
        <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">
          {dt.day} {dt.month} - {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 92: Silk Ribbon
export function Design92({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#faf8f5] p-6 shadow-md relative border border-[#f0ebe1]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-0 bottom-0 left-8 w-12 bg-[#e8e2d5] opacity-30 mix-blend-multiply pointer-events-none" />
      <div className="h-full border border-[#e8e2d5] p-6 flex flex-col justify-center text-center pl-10 relative z-10 bg-white/50 backdrop-blur-sm">
        <div className="w-full aspect-[4/5] bg-gray-100 mb-8 shadow-md">
          <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
        </div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#5c564b] mb-4`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] uppercase tracking-widest text-[#8a8375] mb-4">{hostName}</p>
        )}
        <p className="text-sm font-serif italic text-[#706a5f]">
          {dt.day} {dt.month} Ã  {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 93: Minimalist Circle Overlap
export function Design93({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-8 flex flex-col items-center justify-center font-sans shadow-lg"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-64 h-64 bg-gray-50 rounded-full relative mb-12 shadow-inner">
        <img src={coverImageUrl} className="w-full h-full object-cover rounded-full" alt="" />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-gray-200 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center shadow-lg">
          <p className="text-lg font-bold text-gray-800">{dt.day}</p>
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
            {dt.month}
          </p>
        </div>
      </div>
      <div className="text-center w-full">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 mb-4`}
        >
          {template.name}
        </h2>
        {hostName && <p className="text-xs text-gray-500 italic mb-6">Invitations de {hostName}</p>}
        <p className="text-xs uppercase tracking-widest text-gray-400 border-t border-gray-100 pt-4">
          {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 94: Pastel Gradient Glass
export function Design94({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-gradient-to-tr from-[#f5f7fa] to-[#e8ebf2] p-8 shadow-xl relative"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-[3/4] bg-white/40 backdrop-blur-xl border border-white/60 p-2 shadow-2xl rounded-2xl mb-8 relative z-10 overflow-hidden">
        <img src={coverImageUrl} className="w-full h-full object-cover rounded-xl" alt="" />
      </div>
      <div className="relative z-10 text-center bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-lg">
        {hostName && (
          <p className="text-[10px] uppercase font-bold text-[#7a8896] tracking-[0.2em] mb-2">
            {hostName}
          </p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-[#2c3e50] mb-4`}
        >
          {template.name}
        </h2>
        <div className="flex justify-center gap-4 text-xs font-medium text-[#5c6e7f]">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>â€¢</p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 95: Letterpress Center
export function Design95({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbfbf9] p-4 flex shadow-sm border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border border-gray-200 p-8 w-full flex flex-col justify-center items-center text-center bg-white shadow-inner">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-8 border border-gray-100">
          <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
        </div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl text-gray-800 leading-[0.9] mb-8`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-8">{hostName}</p>
        )}
        <div className="w-8 h-px bg-gray-300 mb-6" />
        <p className="text-xs font-serif text-gray-600">
          {dt.day} {dt.month} {dt.year} <br />
          <span className="mt-2 inline-block">{dt.time}</span>
        </p>
      </div>
    </motion.div>
  );
}

// 96: Wide Margins Editorial
export function Design96({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-10 font-sans text-gray-900 flex flex-col shadow-lg border-b-[12px] border-gray-900"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-6 font-bold">
          Edition {dt.year}
        </p>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl font-bold tracking-tighter mb-8 leading-none`}
        >
          {template.name}
        </h2>
        <div className="w-full aspect-video bg-gray-100 mb-8 overflow-hidden">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover scale-110 object-top"
            alt=""
          />
        </div>
        {hostName && (
          <p className="text-xs text-gray-600 border-l-2 border-gray-200 pl-4 mb-8">
            Curated by {hostName}
          </p>
        )}
      </div>
      <div className="flex justify-between items-end border-t border-gray-200 pt-4">
        <p className="text-sm font-bold">
          {dt.day} {dt.month}
        </p>
        <p className="text-xs text-gray-500 font-mono">{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 97: Midnight Velvet
export function Design97({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#2c2b30] text-[#f0e6d2] p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute inset-4 border border-[#f0e6d2]/20 pointer-events-none" />
      <div className="w-full aspect-square rounded-full overflow-hidden mb-10 border-2 border-[#f0e6d2]/30 p-1">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover rounded-full  opacity-80"
          alt=""
        />
      </div>
      {hostName && (
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-4">{hostName}</p>
      )}
      <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-6`}>
        {template.name}
      </h2>
      <p className="text-xs font-serif italic opacity-80">
        {dt.day} {dt.month} â€” {dt.time}
      </p>
    </motion.div>
  );
}

// 98: Delicate Arch Frame
export function Design98({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbf9f5] p-6 flex flex-col shadow-md"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 border border-[#e0dacd] rounded-t-full p-4 flex flex-col items-center pt-12 pb-8">
        <div className="w-[80%] aspect-[3/4] bg-white shadow-sm mb-10 p-2">
          <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
        </div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-[#5c5448] mb-4 text-center`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] uppercase tracking-widest text-[#9c9386] mb-6">{hostName}</p>
        )}
        <div className="text-center font-medium text-xs text-[#7a7266] uppercase tracking-widest">
          {dt.day} {dt.month} <br />
          <span className="mt-2 inline-block opacity-70">{dt.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// 99: Contemporary Slate
export function Design99({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#eef0f2] p-8 shadow-inner flex flex-col text-[#3a4046]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full h-1 bg-[#d5d9dd] mb-8" />
      <h2
        className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-light leading-none mb-8`}
      >
        {template.name}
      </h2>
      <div className="w-full aspect-square bg-white p-2 shadow-sm mb-8">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>
      {hostName && (
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a9299] mb-4">
          {hostName}
        </p>
      )}
      <div className="flex justify-between items-end">
        <p className="text-2xl font-light">
          {dt.day} {dt.month}
        </p>
        <p className="text-sm text-[#8a9299] font-mono">{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 100: The Masterpiece
export function Design100({
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
      transition={{ duration: 2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-6 relative overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center font-serif"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute inset-0 bg-[#fdfbf7] opacity-80" />
      <img
        src={coverImageUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply blur-[2px]"
        alt=""
      />

      <div className="relative z-10 w-full h-full border border-[#d4af37]/40 p-8 flex flex-col justify-center items-center bg-white/60 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.8)]">
        {hostName && (
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#d4af37] mb-8 font-sans">
            {hostName}
          </p>
        )}

        <div className="w-32 h-40 bg-white mb-8 p-1 shadow-xl border border-gray-100 rotate-2">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl text-gray-900 mb-8 leading-[1.1]`}
        >
          {template.name}
        </h2>

        <div className="w-12 h-px bg-[#d4af37] mx-auto mb-6" />

        <p className="text-sm text-gray-700 italic tracking-wide">
          {dt.day} {dt.month} {dt.year}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-4 font-sans">
          {dt.time}
        </p>
      </div>
    </motion.div>
  );
}
