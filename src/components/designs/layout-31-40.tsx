import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 31: Pop Art / Comic
export function Design31({
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
      className="mx-auto w-full max-w-sm bg-yellow-400 p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative overflow-hidden"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Halftone dots background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(black 20%, transparent 20%)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative z-10 bg-white border-4 border-black p-4 mb-4 transform -rotate-2 hover:rotate-0 transition-transform">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl uppercase font-black tracking-tighter text-red-500`}
          style={{ textShadow: "3px 3px 0px black" }}
        >
          {template.name}
        </h2>
        {hostName && (
          <div className="bg-black text-white px-2 py-1 inline-block mt-2 font-bold text-xs uppercase border-2 border-white">
            {hostName}
          </div>
        )}
      </div>

      <div className="relative z-10 w-full aspect-[4/3] border-4 border-black bg-white mb-4 transform rotate-1 overflow-hidden">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover contrast-150 saturate-200"
          alt=""
        />
      </div>

      <div className="relative z-10 flex gap-4 font-black uppercase text-xl">
        <div className="bg-cyan-400 border-4 border-black p-2 flex-1 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs">WHEN</p>
          <p>
            {dt.day} {dt.month.substring(0, 3)}
          </p>
        </div>
        <div className="bg-pink-400 border-4 border-black p-2 flex-1 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white">
          <p className="text-xs text-black">TIME</p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 32: Pastel Vellum
export function Design32({
  template,
  coverImageUrl,
  hostName,
  message,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] flex flex-col items-center justify-center p-8 relative overflow-hidden bg-transparent"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-[3/4] relative z-10 mb-8">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover rounded-t-full shadow-md"
          alt=""
        />
        <div className="absolute inset-0 rounded-t-full ring-1 ring-inset ring-white/50" />
      </div>

      <div className="relative z-20 text-center w-full bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-lg">
        {(themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle) && (
          <p
            data-inv-ceremony
            className="text-xs uppercase font-bold tracking-[0.25em] mb-2 font-sans"
            style={{
              color: themeOverrides?.ceremonyColor || themeOverrides?.accent || "#8c8270",
              fontSize: themeOverrides?.fontSizeLabel ? `${themeOverrides.fontSizeLabel}px` : undefined,
            }}
          >
            {themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle}
          </p>
        )}
        {hostName && (
          <p
            data-inv-subtitle
            className="text-[10px] uppercase tracking-widest mb-2 font-sans"
            style={{
              color: themeOverrides?.subtitleColor || "#9ca3af",
              fontSize: themeOverrides?.fontSizeSubtitle ? `${Math.min(16, themeOverrides.fontSizeSubtitle)}px` : undefined,
              fontWeight: themeOverrides?.fontWeightSubtitle || undefined,
            }}
          >
            {hostName}
          </p>
        )}
        <h2
          data-inv-title
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl mb-4`}
          style={{
            color: themeOverrides?.titleColor || "#1f2937",
            fontSize: themeOverrides?.fontSizeTitle ? `${themeOverrides.fontSizeTitle}px` : undefined,
            fontWeight: themeOverrides?.fontWeightTitle || (themeOverrides?.titleBold ? 700 : undefined),
          }}
        >
          {template.name}
        </h2>
        <p
          data-inv-date
          className="text-sm font-medium"
          style={{
            color: themeOverrides?.dateColor || themeOverrides?.subtitleColor || "#4b5563",
            fontSize: themeOverrides?.fontSizeDate ? `${themeOverrides.fontSizeDate}px` : undefined,
            fontWeight: themeOverrides?.fontWeightDate || (themeOverrides?.dateBold ? 700 : undefined),
          }}
        >
          {dt.day} {dt.month} • {dt.time}
        </p>
        {message && (
          <p
            data-inv-message
            className="text-xs italic mt-3 whitespace-pre-line leading-relaxed"
            style={{
              color: themeOverrides?.messageColor || themeOverrides?.subtitleColor || "#6b7280",
              fontSize: themeOverrides?.fontSizeMessage ? `${themeOverrides.fontSizeMessage}px` : undefined,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// 33: Origami Folded
export function Design33({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-transparent p-8 relative perspective-1000"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-square overflow-hidden shadow-lg transform rotate-3 bg-white p-2 mb-8 relative z-10">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="text-center relative z-10 p-4">
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#333] mb-2`}>
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-[#777] mb-4">— {hostName} —</p>
        )}

        <div className="flex justify-center gap-4 text-[#555] font-serif italic text-lg">
          <p>
            {dt.day} {dt.month}
          </p>
          <span className="text-[#ccc]">•</span>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 34: Liquid Swirls
export function Design34({
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
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-6 relative overflow-hidden bg-transparent"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="relative z-10 h-full flex flex-col items-center justify-center pt-8">
        <div className="w-48 h-64 rounded-[100px] overflow-hidden shadow-2xl mb-8 border-4 border-white/50">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div
          className="p-6 w-full text-center"
          style={{ color: p.text }}
        >
          {hostName && (
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-2 opacity-80">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-4`}
            style={{ color: p.titleColor }}
          >
            {template.name}
          </h2>

          <div className="flex justify-center gap-8 font-semibold">
            <div>
              <p className="text-2xl">{dt.day}</p>
              <p className="text-xs uppercase">{dt.month}</p>
            </div>
            <div className="w-px bg-current opacity-20" />
            <div className="flex items-center">
              <p className="text-xl">{dt.time}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 35: Golden Ratio Grid
export function Design35({
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
      className="mx-auto w-full max-w-sm aspect-[1/1.618] bg-white border border-gray-200 shadow-xl flex flex-col font-sans text-black"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Top 61.8% Image */}
      <div className="w-full h-[61.8%] relative border-b border-gray-200">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover   transition-all duration-1000"
          alt=""
        />
      </div>

      {/* Bottom 38.2% Split */}
      <div className="w-full h-[38.2%] flex">
        {/* Left 61.8% of bottom -> Title */}
        <div className="w-[61.8%] h-full p-4 flex flex-col justify-between border-r border-gray-200">
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-3xl uppercase font-black leading-none tracking-tighter`}
          >
            {template.name}
          </h2>
          {hostName && <p className="text-[10px] font-bold uppercase text-gray-500">{hostName}</p>}
        </div>

        {/* Right 38.2% of bottom -> Details Split vertically */}
        <div className="w-[38.2%] h-full flex flex-col">
          <div className="h-[61.8%] p-3 border-b border-gray-200 flex flex-col justify-center items-center text-center bg-black text-white">
            <p className="text-2xl font-black">{dt.day}</p>
            <p className="text-[9px] uppercase tracking-widest">{dt.month}</p>
          </div>
          <div className="h-[38.2%] p-2 flex flex-col justify-center items-center text-center bg-gray-100">
            <p className="text-[10px] uppercase text-gray-500">TIME</p>
            <p className="text-sm font-bold">{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 36: Pastel Gradient Blur
export function Design36({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] p-8 shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        ...fontVars(template, themeOverrides),
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div
        className="w-full aspect-square rounded-full p-2 bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-200 mb-8 animate-spin-slow"
        style={{ animationDuration: "20s" }}
      >
        <div
          className="w-full h-full rounded-full overflow-hidden border-4 border-white animate-spin-reverse-slow"
          style={{ animationDuration: "20s" }}
        >
          <img src={coverImageUrl} className="w-full h-full object-cover scale-110" alt="" />
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white w-full relative z-10">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-2`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">{hostName}</p>
        )}

        <div className="inline-flex items-center justify-center gap-4 text-gray-600 font-medium px-4 py-2 bg-white/50 rounded-full">
          <span>
            {dt.day} {dt.month}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
          <span>{dt.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// 37: Elegant Serif Grid
export function Design37({
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
      transition={{ duration: 1 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fcfbfa] p-8 font-serif text-gray-900 shadow-sm border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className={"${getTitleFontClass(template, themeOverrides)} text-4xl mb-2"}>
          {template.name}
        </h2>
        {hostName && <p className="text-xs italic text-gray-500">par {hostName}</p>}
      </div>

      <div className="w-full aspect-square bg-gray-100 mb-6 p-1 border border-gray-200">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
          <p className="text-sm font-medium">
            {dt.day} {dt.month}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Heure</p>
          <p className="text-sm font-medium">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 38: Museum Poster
export function Design38({
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
      className="mx-auto w-full max-w-sm bg-white p-6 min-h-[85vh] flex flex-col justify-between shadow-xl border-8 border-[#f4f4f4]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-[4/5] bg-gray-100 mb-8 relative">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="text-left">
        {hostName && (
          <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-2">
            {hostName}
          </p>
        )}
        <h2
          className={
            "${getTitleFontClass(template, themeOverrides)} text-5xl font-light leading-[0.9] mb-4 text-black"
          }
        >
          {template.name}
        </h2>
        <p className="text-xs font-sans text-gray-500">
          {dt.weekday} {dt.day} {dt.month} {dt.year} <br /> {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 39: Vinyl Record Sleeve
export function Design39({
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
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="mx-auto w-full max-w-sm aspect-square bg-[#ece8e1] shadow-[15px_15px_30px_rgba(0,0,0,0.2)] p-2 relative"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* The vinyl record peeking out */}
      <div className="absolute top-2 -right-12 w-full h-[calc(100%-16px)] bg-black rounded-full shadow-inner z-0 flex items-center justify-center border-[10px] border-[#111]">
        <div
          className="w-1/3 h-1/3 rounded-full"
          style={{ backgroundColor: p.accent || "#ff5555" }}
        >
          <div className="w-full h-full rounded-full border-4 border-black flex items-center justify-center">
            <div className="w-3 h-3 bg-[#ece8e1] rounded-full" />
          </div>
        </div>
      </div>

      {/* The sleeve */}
      <div className="relative z-10 w-full h-full bg-white border border-gray-200 shadow-md p-6 flex flex-col justify-between overflow-hidden">
        <img
          src={coverImageUrl}
          className="absolute inset-0 w-full h-full object-cover opacity-20 "
          alt=""
        />

        <div className="relative z-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Stereo</p>
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-black leading-none uppercase mix-blend-multiply`}
            style={{ color: p.titleColor || "#222" }}
          >
            {template.name}
          </h2>
        </div>

        <div className="relative z-20 border-t-2 border-black pt-4 flex justify-between items-end">
          <div>
            <p className="text-xs font-bold uppercase">Side A</p>
            {hostName && <p className="text-lg font-serif italic">{hostName}</p>}
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">
              {dt.day} {dt.month}
            </p>
            <p className="text-xs uppercase text-gray-500">{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 40: Soft Linen
export function Design40({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f5f2eb] p-8 shadow-sm flex flex-col items-center justify-center text-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-40 h-56 rounded-full overflow-hidden mb-8 border-4 border-white shadow-lg">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <h2 className={"${getTitleFontClass(template, themeOverrides)} text-4xl text-[#5c544d] mb-4"}>
        {template.name}
      </h2>

      <div className="w-8 h-px bg-[#c2b9af] mx-auto mb-4" />

      <p className="text-xs font-serif uppercase tracking-widest text-[#8a8178]">
        {dt.day} {dt.month} • {dt.time}
      </p>
    </motion.div>
  );
}
