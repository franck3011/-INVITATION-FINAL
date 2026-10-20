import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 21: Elegant Serif Stack
export function Design21({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fdfbf7] p-8 shadow-lg font-serif border border-gray-200"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="text-center mb-8">
        {hostName && (
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-normal leading-[1.1]`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
      </div>
      <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden shadow-md">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover  opacity-90  hover:opacity-100 transition-all duration-1000"
          alt=""
        />
      </div>
      <div className="mt-8 text-center border-y border-gray-300 py-4">
        <p className="text-lg italic text-gray-700">
          {dt.weekday} {dt.day} {dt.month} {dt.year}
        </p>
        <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 22: Blurred Bottom Panel
export function Design22({
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-sm h-[85vh] relative overflow-hidden shadow-2xl rounded-xl"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <img src={coverImageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute bottom-0 left-0 w-full p-6 backdrop-blur-xl bg-white/60 border-t border-white/40 shadow-lg">
        {hostName && (
          <p className="text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
            {hostName}
          </p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl font-bold text-black mb-4`}
        >
          {template.name}
        </h2>
        <div className="flex gap-4 text-sm font-medium text-black/80">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> {dt.day} {dt.month}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {dt.time}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 23: Minimalist Gallery
export function Design23({
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
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm bg-white p-8 min-h-[85vh] shadow-sm border border-gray-100 flex flex-col items-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-square p-2 bg-white shadow-xl mb-12 transform -rotate-1">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>

      <div className="text-center w-full">
        {hostName && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-8`}
        >
          {template.name}
        </h2>

        <div className="flex justify-center items-center gap-6 border-t border-gray-200 pt-6">
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-gray-400">Date</p>
            <p className="text-sm font-medium text-gray-700">
              {dt.day} {dt.month}
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-widest text-gray-400">Heure</p>
            <p className="text-sm font-medium text-gray-700">{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 24: Monospace Tech
export function Design24({
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
      className="mx-auto w-full max-w-sm bg-gray-100 min-h-[85vh] font-mono shadow-md border border-gray-300 relative overflow-hidden"
      style={{ color: p.text, ...fontVars(template, themeOverrides) }}
    >
      <div className="bg-gray-200 border-b border-gray-300 p-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <p className="text-[10px] text-gray-500 ml-2">invite.exe</p>
      </div>

      <div className="p-6">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl font-bold tracking-tight mb-6 uppercase`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>

        <div className="w-full aspect-[16/9] mb-6 overflow-hidden border-2 border-black rounded-lg">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="bg-black text-green-400 p-4 rounded-lg text-sm">
          <p>$ ./view_details --host="{hostName}"</p>
          <p className="mt-2 text-white">
            Date: {dt.day} {dt.month} {dt.year}
          </p>
          <p className="text-white">Time: {dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 25: Split Horizontal
export function Design25({
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-sm h-[85vh] flex flex-col shadow-2xl"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="h-1/2 w-full overflow-hidden">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          alt=""
        />
      </div>
      <div
        className="h-1/2 w-full p-8 flex flex-col justify-center text-center"
        style={{ background: p.bg, color: p.text }}
      >
        {hostName && (
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-70">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-6`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
        <div className="flex justify-center gap-6 text-sm font-semibold opacity-80 uppercase tracking-widest">
          <span>
            {dt.day} {dt.month}
          </span>
          <span className="w-1 h-1 bg-current rounded-full self-center" />
          <span>{dt.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// 26: Circular Focus
export function Design26({
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
      transition={{ duration: 0.8 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] flex flex-col items-center justify-center p-8 bg-[#e8e4db] shadow-lg border-8 border-white"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-48 h-48 rounded-full overflow-hidden mb-8 shadow-inner border-4 border-white/50">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
          alt=""
        />
      </div>

      <div className="text-center w-full bg-white p-6 rounded-3xl shadow-sm">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl mb-2`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
        {hostName && <p className="text-xs font-serif italic text-gray-500 mb-6">{hostName}</p>}

        <div className="flex justify-around border-t border-gray-100 pt-4 text-sm font-medium">
          <p className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">Jour</span> {dt.day} {dt.month}
          </p>
          <p className="flex flex-col border-l border-gray-100 pl-4">
            <span className="text-xs text-gray-400 uppercase">Heure</span> {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 27: Modern Magazine Cover
export function Design27({
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
      className="mx-auto w-full max-w-sm h-[85vh] relative overflow-hidden bg-white shadow-2xl font-sans"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <h1 className="absolute top-4 w-full text-center text-7xl font-black uppercase tracking-tighter text-black/10 z-0">
        MAGAZINE
      </h1>

      <div className="absolute inset-0 top-16 p-6 pb-20">
        <div className="w-full h-full relative z-10 shadow-2xl border-4 border-white">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2
              className={`${getTitleFontClass(template, themeOverrides)} text-4xl font-bold leading-none mb-2`}
            >
              {template.name}
            </h2>
            {hostName && (
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
                {hostName}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-black flex items-center justify-between px-8 text-white z-20">
        <p className="font-bold uppercase tracking-widest text-xs">Issue No. 1</p>
        <p className="font-bold text-sm">
          {dt.day} {dt.month} - {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 28: Geometric Bauhaus
export function Design28({
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#ebe6dd] relative overflow-hidden shadow-lg p-6 font-sans"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d14949] rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#35528c] rounded-tr-full" />
      <div className="absolute top-1/2 left-4 w-12 h-12 bg-[#e3ad44] rounded-full" />

      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="w-[80%] aspect-square bg-white p-2 shadow-xl rotate-3 mx-auto mb-8">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover  contrast-125 mix-blend-multiply"
            alt=""
          />
        </div>

        <div className="bg-white/90 p-6 shadow-md border-l-8 border-[#222]">
          {hostName && (
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
              {hostName}
            </p>
          )}
          <h2 className={`text-4xl font-black uppercase leading-none mb-4 text-[#222]`}>
            {template.name}
          </h2>

          <div className="flex items-center gap-4 text-sm font-bold text-[#d14949]">
            <p>
              {dt.day} {dt.month} {dt.year}
            </p>
            <p className="w-2 h-2 bg-[#e3ad44] rounded-full" />
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 29: Romantic Floral Frame (Soft edge)
export function Design29({
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
      transition={{ duration: 1.2 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-pink-50 p-4 shadow-xl"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full h-full border-[1px] border-pink-200 p-4 relative bg-white">
        {/* Soft corner accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-pink-300 rounded-tl-xl" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-pink-300 rounded-tr-xl" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-pink-300 rounded-bl-xl" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-pink-300 rounded-br-xl" />

        <div className="w-full aspect-[4/5] rounded-[40px] overflow-hidden mb-6 shadow-sm border border-pink-100">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90 " alt="" />
        </div>

        <div className="text-center px-4">
          {hostName && (
            <p className="text-[10px] font-serif italic text-pink-600 mb-2">{hostName}</p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-4 text-pink-900`}
          >
            {template.name}
          </h2>
          <p className="text-xs uppercase tracking-widest text-pink-500 font-medium">
            {dt.day} {dt.month} â€” {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 30: Vintage Ticket
export function Design30({
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
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: 0 }}
      className="mx-auto w-full max-w-sm bg-[#e8decd] shadow-2xl relative overflow-hidden font-mono text-[#3a2c20]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Ticket perforations */}
      <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-black/10" />
      <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-black/10" />
      <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-[#c6bdae]" />

      <div className="p-6 pb-12 flex flex-col items-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4">Admit One</p>
        <div className="w-full aspect-[16/9] border-2 border-[#3a2c20] p-1 bg-white mb-6">
          <img src={coverImageUrl} className="w-full h-full object-cover  contrast-125" alt="" />
        </div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-center leading-none font-bold uppercase`}
        >
          {template.name}
        </h2>
      </div>

      <div className="p-6 pt-8 bg-[#dbcdb7] flex flex-col items-center">
        {hostName && <p className="text-xs font-bold uppercase mb-2">HOST: {hostName}</p>}
        <div className="flex gap-4 w-full border-2 border-[#3a2c20] bg-[#e8decd] p-3 text-center uppercase text-sm font-bold">
          <div className="flex-1 border-r-2 border-[#3a2c20]">
            <p className="text-[9px]">Date</p>
            <p>
              {dt.day} {dt.month.substring(0, 3)}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-[9px]">Time</p>
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
