import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 61: Soft Focus Oval
export function Design61({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbfbfb] p-8 flex flex-col justify-center items-center font-serif text-gray-800"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-[80%] aspect-[3/4] rounded-[50%] overflow-hidden mb-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-8 border-white bg-white">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>
      <div className="text-center">
        {hostName && (
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">{hostName}</p>
        )}
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-6 font-light`}>
          {template.name}
        </h2>
        <div className="w-12 h-px bg-gray-300 mx-auto mb-6" />
        <p className="text-sm font-medium tracking-widest uppercase text-gray-500">
          {dt.day} {dt.month} - {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 62: Deep Blue Romance
export function Design62({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#1a2530] text-[#f4eedd] p-6 shadow-xl border border-[#2c3e50]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border border-[#f4eedd]/20 p-6 h-full flex flex-col justify-between">
        <div className="text-center mb-8">
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-3xl font-normal leading-snug`}
          >
            {template.name}
          </h2>
        </div>
        <div className="w-full aspect-[4/5] bg-gray-900 mb-8 border border-[#f4eedd]/20 p-1">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover opacity-80 mix-blend-screen"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center text-xs tracking-widest font-sans uppercase opacity-80">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 63: Minimalist Stack
export function Design63({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-8 flex flex-col shadow-sm border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full h-[50vh] mb-8 bg-gray-50">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      <div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 leading-tight mb-4`}
        >
          {template.name}
        </h2>
        {hostName && <p className="text-sm font-serif italic text-gray-500 mb-6">{hostName}</p>}
        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          <div>
            <p className="mb-1 text-gray-300">Date</p>
            <p className="text-gray-800">
              {dt.day} {dt.month}
            </p>
          </div>
          <div>
            <p className="mb-1 text-gray-300">Heure</p>
            <p className="text-gray-800">{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 64: Fine Lines
export function Design64({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbf9f6] p-4 shadow-lg text-gray-800"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border border-gray-300 p-2 h-full flex flex-col justify-center items-center text-center">
        <div className="border border-gray-300 p-6 w-full h-full flex flex-col items-center">
          {hostName && (
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-6">{hostName}</p>
          )}
          <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-8`}>
            {template.name}
          </h2>
          <div className="w-full aspect-[4/3] bg-gray-100 mb-8 border border-gray-200 p-1">
            <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
          </div>
          <div className="flex gap-4 text-xs font-medium uppercase tracking-widest text-gray-500">
            <p>
              {dt.day} {dt.month}
            </p>
            <p className="text-gray-300">|</p>
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 65: Peach Glow
export function Design65({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-gradient-to-br from-[#fff3ed] to-[#fce4da] p-8 shadow-xl flex flex-col text-[#8a5a44]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-white">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-6 font-bold`}>
          {template.name}
        </h2>
        <div className="bg-white/40 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/60">
          <p className="text-sm font-bold uppercase tracking-widest">
            {dt.day} {dt.month}
          </p>
          <p className="text-xs mt-1">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 66: Elegant Offset
export function Design66({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-6 relative overflow-hidden shadow-md"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-10 right-4 w-3/4 aspect-[3/4] bg-gray-50 shadow-lg">
        <img src={coverImageUrl} className="w-full h-full object-cover  opacity-90" alt="" />
      </div>
      <div className="absolute bottom-20 left-6 right-10 bg-white/90 backdrop-blur p-6 shadow-xl border border-gray-100">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 leading-none mb-4`}
        >
          {template.name}
        </h2>
        <div className="flex justify-between items-end border-t border-gray-200 pt-4">
          <p className="text-xs font-serif italic text-gray-500">{hostName}</p>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-800">
            {dt.day} {dt.month}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 67: Charcoal & Cream
export function Design67({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#2a2a2a] p-8 text-[#f4f1e1] shadow-2xl font-serif"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border-b border-[#444] pb-6 mb-8 text-center">
        {hostName && (
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-[#aaa]">{hostName}</p>
        )}
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl`}>
          {template.name}
        </h2>
      </div>
      <div className="w-full aspect-[4/5] bg-black mb-8 border border-[#444] p-1">
        <img src={coverImageUrl} className="w-full h-full object-cover opacity-80" alt="" />
      </div>
      <div className="flex justify-between text-xs tracking-widest uppercase text-[#ccc]">
        <p>
          {dt.day} {dt.month}
        </p>
        <p>{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 68: Frosted Window
export function Design68({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] relative overflow-hidden flex flex-col justify-center p-6 shadow-lg"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <img
        src={coverImageUrl}
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60"
        alt=""
      />
      <div className="absolute inset-0 bg-white/40" />

      <div className="relative z-10 bg-white/70 backdrop-blur-2xl p-8 rounded-3xl border border-white/50 shadow-xl text-center">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-6`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">{hostName}</p>
        )}
        <div className="inline-block px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-gray-700">
          {dt.day} {dt.month} â€¢ {dt.time}
        </div>
      </div>
    </motion.div>
  );
}

// 69: Muted Lavender
export function Design69({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f0eff4] p-6 shadow-md text-[#4a4759]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="h-full border border-[#d6d4e0] p-6 flex flex-col">
        <div className="text-center mb-8">
          <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-2`}>
            {template.name}
          </h2>
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8b879c]">
            {hostName}
          </p>
        </div>
        <div className="flex-1 w-full rounded-t-[80px] overflow-hidden bg-gray-200 shadow-inner mb-6">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90 " alt="" />
        </div>
        <div className="text-center text-sm font-serif italic">
          <p>
            {dt.day} {dt.month} {dt.year} Ã  {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 70: Monolithic White
export function Design70({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-12 flex flex-col justify-between font-sans border-t-[20px] border-gray-100 shadow-sm"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-[4/3] bg-gray-50 mb-12">
        <img src={coverImageUrl} className="w-full h-full object-cover  opacity-70" alt="" />
      </div>
      <div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl font-bold tracking-tighter text-black leading-none mb-6`}
        >
          {template.name.toUpperCase()}
        </h2>
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8">{hostName}</p>
        )}
        <div className="flex justify-between border-t border-gray-200 pt-4 text-[10px] font-bold uppercase tracking-widest text-black">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}
