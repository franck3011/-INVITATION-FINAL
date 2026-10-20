import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 41: Scrapbook / Collage
export function Design41({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#eae7de] p-6 shadow-xl relative overflow-hidden"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Tape piece */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/50 backdrop-blur-sm -rotate-3 z-20 shadow-sm" />

      <motion.div
        initial={{ rotate: -5, y: 20 }}
        animate={{ rotate: 2, y: 0 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="w-full aspect-[4/5] bg-white p-3 shadow-md mb-8 relative z-10 border border-gray-200"
      >
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </motion.div>

      <motion.div
        initial={{ rotate: 5, x: 20 }}
        animate={{ rotate: -2, x: 0 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="bg-[#f4ebd0] p-4 shadow-md absolute bottom-12 right-4 w-[80%] border-2 border-dashed border-[#d1c8b3] z-20"
      >
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-gray-800 mb-2 leading-tight`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs uppercase font-bold text-gray-500 font-mono handwritten-feel mb-2">
            {hostName}
          </p>
        )}
        <div className="flex gap-4 text-sm font-medium text-gray-700">
          <span className="bg-red-400 text-white px-2 py-0.5 transform -rotate-2">
            {dt.day} {dt.month}
          </span>
          <span className="bg-blue-400 text-white px-2 py-0.5 transform rotate-2">{dt.time}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 42: Luminous Glass
export function Design42({
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
      transition={{ duration: 1.5 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f8f9fa] p-6 relative overflow-hidden flex flex-col justify-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full blur-[80px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100 rounded-full blur-[80px] opacity-60" />

      <div className="relative z-10 bg-white/50 backdrop-blur-xl border border-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90" alt="" />
        </div>
        <div className="text-center">
          {hostName && (
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] mb-2">
              {hostName}
            </p>
          )}
          <h2
            className={"${getTitleFontClass(template, themeOverrides)} text-3xl text-gray-800 mb-4"}
          >
            {template.name}
          </h2>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
            {dt.day} {dt.month} • {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 43: High Fashion / Editorial
export function Design43({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-sm h-[85vh] bg-white relative overflow-hidden font-serif"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Bleeding Text Background */}
      <h2
        className={`${getTitleFontClass(template, themeOverrides)} absolute -left-10 top-20 text-[120px] font-black leading-none opacity-5 break-words w-[150%] uppercase pointer-events-none`}
      >
        {template.name}
      </h2>

      <div className="absolute top-10 right-10 w-2/3 h-2/3 bg-gray-100 z-10 shadow-2xl">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="absolute bottom-12 left-8 z-20 w-[80%]">
        <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-gray-500">Exhibition</p>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-light leading-[0.9] mb-6`}
          style={{ color: p.titleColor || "#000" }}
        >
          {template.name}
        </h2>
        {hostName && <p className="text-sm italic text-gray-600 mb-6">{hostName}</p>}

        <div className="flex justify-between border-t border-black pt-2 w-3/4">
          <p className="text-xs uppercase tracking-widest">
            {dt.day} {dt.month}
          </p>
          <p className="text-xs uppercase tracking-widest">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 44: Minimalist Typewriter
export function Design44({
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
      className="mx-auto w-full max-w-sm bg-[#f9f8f6] min-h-[85vh] p-8 shadow-sm font-mono text-black border border-[#eee]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full border-b-2 border-black pb-2 mb-8 flex justify-between items-end">
        <p className="text-xs">DOC_REF: {template.id.substring(0, 6).toUpperCase()}</p>
        <p className="text-xs">{dt.year}</p>
      </div>

      <div className="w-full aspect-[3/4] border-2 border-black p-2 mb-8">
        <img src={coverImageUrl} className="w-full h-full object-cover  contrast-125" alt="" />
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase">_SUBJECT:</p>
        <h2 className="text-3xl font-bold uppercase leading-none">{template.name}</h2>
        {hostName && (
          <div className="flex">
            <p className="text-xs uppercase w-20">_HOST:</p>
            <p className="text-xs font-bold uppercase">{hostName}</p>
          </div>
        )}
        <div className="flex">
          <p className="text-xs uppercase w-20">_WHEN:</p>
          <p className="text-xs font-bold uppercase">
            {dt.day} {dt.month} @ {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 45: Y2K Aesthetic
export function Design45({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.6 }}
      className="mx-auto w-full max-w-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-[85vh] p-4 text-white relative overflow-hidden font-sans"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Shiny star shapes */}
      <div className="absolute top-10 right-10 text-4xl animate-spin-slow">âœ¨</div>
      <div className="absolute bottom-20 left-10 text-3xl animate-bounce">ðŸ¦‹</div>

      <div className="bg-white/20 backdrop-blur-xl border border-white/40 p-6 rounded-[2rem] shadow-2xl mt-12 relative z-10 text-center">
        <div className="w-full aspect-square rounded-[2rem] overflow-hidden border-4 border-white mb-6">
          <img src={coverImageUrl} className="w-full h-full object-cover saturate-150" alt="" />
        </div>

        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-200 drop-shadow-md mb-2`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs font-bold uppercase tracking-widest text-white/90 mb-4 bg-black/20 rounded-full inline-block px-4 py-1">
            {hostName}
          </p>
        )}

        <div className="flex justify-center gap-6 font-bold bg-white/30 rounded-2xl py-3 px-6 text-pink-900">
          <p>
            {dt.day}/{dt.month.substring(0, 3)}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 46: Soft Watercolor
export function Design46({
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
      transition={{ duration: 1.5 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 flex flex-col justify-center items-center text-center shadow-lg bg-white relative"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Watercolor blob background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, #fbc2eb 0%, #a6c1ee 100%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="w-48 h-64 overflow-hidden mb-8 relative z-10 shadow-xl"
        style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
      >
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative z-10">
        {hostName && <p className="text-xs font-serif italic text-gray-500 mb-4">{hostName}</p>}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-6 font-light leading-tight`}
        >
          {template.name}
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto mb-6" />
        <p className="text-sm uppercase tracking-widest text-gray-500">
          {dt.day} {dt.month} <br />
          <span className="text-[10px]">{dt.time}</span>
        </p>
      </div>
    </motion.div>
  );
}

// 47: Contemporary Art Gallery
export function Design47({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-10 font-sans text-gray-900 shadow-sm border border-gray-100 flex flex-col justify-between"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="text-right border-b border-gray-200 pb-4 mb-8">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">Exhibition 01</p>
        <p className="text-xs font-bold mt-1">{dt.year}</p>
      </div>

      <div className="w-full aspect-[3/4] mb-8 bg-gray-50 shadow-md">
        <img src={coverImageUrl} className="w-full h-full object-cover  opacity-90" alt="" />
      </div>

      <div>
        <h1
          className="text-4xl font-light tracking-tight leading-none mb-4"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {template.name}
        </h1>
        {hostName && <p className="text-xs text-gray-500 mb-4">Curated by {hostName}</p>}

        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500">
          <p>
            Date: {dt.day} {dt.month}
          </p>
          <p>Time: {dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 48: French Riviera
export function Design48({
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
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbf9f6] p-6 shadow-xl text-center relative border-8 border-white"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#e8dfce] pointer-events-none z-20" />

      <div className="w-full aspect-[4/5] overflow-hidden mb-6 relative z-10">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>

      <div className="relative z-10 bg-white -mt-16 mx-4 p-6 shadow-sm border border-[#e8dfce]">
        {hostName && (
          <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">{hostName}</p>
        )}
        <h2
          className={"${getTitleFontClass(template, themeOverrides)} text-3xl text-gray-800 mb-4"}
        >
          {template.name}
        </h2>
        <div className="flex justify-center gap-4 text-xs font-serif italic text-gray-600">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 49: Holographic Foil
export function Design49({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
      style={{
        ...fontVars(template, themeOverrides),
        background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      }}
    >
      {/* Foil overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)",
          backgroundSize: "400% 400%",
          animation: "gradient 10s ease infinite",
        }}
      />

      <div className="relative z-10 w-full aspect-square bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/50 mb-8">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover rounded-xl opacity-90 mix-blend-multiply"
          alt=""
        />
      </div>

      <div className="relative z-10 text-center bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl text-gray-800">
        {hostName && (
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-2">
            {hostName}
          </p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-4 font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600`}
        >
          {template.name}
        </h2>
        <div className="flex justify-center gap-6 text-sm font-bold uppercase text-gray-700">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 50: Avant-Garde Luxury
export function Design50({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const p = getPalette(template, themeOverrides);
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-12 flex flex-col justify-between shadow-sm border border-gray-100 font-serif"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full">
        {hostName && (
          <p className="text-[8px] uppercase tracking-[0.4em] text-gray-400 mb-8">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-normal leading-[1] text-gray-900 mb-8`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
      </div>

      <div className="w-full aspect-square mb-8">
        <img src={coverImageUrl} className="w-full h-full object-cover  opacity-80" alt="" />
      </div>

      <div className="border-t border-gray-200 pt-6 flex justify-between items-start">
        <div className="text-[9px] uppercase tracking-widest text-gray-500">
          <p>Date</p>
          <p className="mt-1 text-gray-900">
            {dt.day} {dt.month} {dt.year}
          </p>
        </div>
        <div className="text-[9px] uppercase tracking-widest text-gray-500 text-right">
          <p>Time</p>
          <p className="mt-1 text-gray-900">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}
