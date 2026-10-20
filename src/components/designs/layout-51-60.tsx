import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 51: Fine Art Torn Edge
export function Design51({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbf9f5] p-8 shadow-sm flex flex-col items-center border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-[3/4] mb-8 bg-white p-2 shadow-md relative">
        <img src={coverImageUrl} className="w-full h-full object-cover  " alt="" />
        {/* Fake torn edge effect via CSS border */}
      </div>
      <div className="text-center font-serif text-[#4a4238]">
        {hostName && <p className="text-[10px] uppercase tracking-[0.2em] mb-4">{hostName}</p>}
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-6`}>
          {template.name}
        </h2>
        <p className="text-xs italic">
          {dt.day} {dt.month} {dt.year} <br />
          <span className="mt-2 inline-block">â€” {dt.time} â€”</span>
        </p>
      </div>
    </motion.div>
  );
}

// 52: Ivory Letterpress
export function Design52({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fdfbf7] p-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] border border-[#f0ede6]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <h2
        className={`${getTitleFontClass(template, themeOverrides)} text-5xl text-[#3b3631] text-center mb-8 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]`}
      >
        {template.name}
      </h2>
      <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-inner mb-8">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="text-center text-[#5c544d]">
        {hostName && (
          <p className="text-xs font-medium uppercase tracking-widest mb-4">{hostName}</p>
        )}
        <div className="flex justify-center items-center gap-4 text-sm font-serif">
          <span>
            {dt.day} {dt.month}
          </span>
          <span className="w-1.5 h-1.5 bg-[#e3dcc8] rounded-full" />
          <span>{dt.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// 53: Velvet Blush
export function Design53({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f9f1f0] p-6 shadow-xl text-[#5a464c]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border border-[#e6d5d3] p-6 h-full flex flex-col justify-between items-center text-center">
        <div className="w-full aspect-video rounded-t-[100px] overflow-hidden mb-8">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>
        <div>
          {hostName && (
            <p className="text-[9px] uppercase tracking-widest mb-3 opacity-60">{hostName}</p>
          )}
          <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-6`}>
            {template.name}
          </h2>
          <p className="text-sm font-light tracking-wide">
            {dt.day} {dt.month} <br /> {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 54: Minimalist Arch
export function Design54({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white shadow-lg flex flex-col"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 rounded-t-full overflow-hidden m-4 mb-0 bg-gray-50 relative">
        <img src={coverImageUrl} className="w-full h-full object-cover absolute inset-0" alt="" />
      </div>
      <div className="p-8 text-center text-gray-800">
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-2`}>
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{hostName}</p>
        )}
        <p className="text-sm font-medium">
          {dt.day} {dt.month} â€” {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 55: Golden Foil Frame
export function Design55({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fdfbf9] p-6 shadow-xl relative"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute inset-4 border border-[#d4af37] opacity-40 pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#d4af37] opacity-20 pointer-events-none" />

      <div className="h-full flex flex-col justify-center items-center text-center p-8">
        <div className="w-24 h-32 mb-8 bg-gray-100 shadow-md">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-[#d4af37] mb-4`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">{hostName}</p>
        )}
        <p className="text-xs font-serif text-gray-600">
          {dt.day} {dt.month} {dt.year} <br /> {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 56: Pearl Overlap
export function Design56({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#faf9f6] p-8 relative flex flex-col justify-end shadow-md"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-8 left-8 right-12 bottom-32 bg-gray-200">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 ml-12 shadow-xl border border-white">
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#333] mb-2`}>
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">{hostName}</p>
        )}
        <div className="flex gap-4 text-xs font-medium text-gray-600">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 57: Vellum Typographic
export function Design57({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white relative overflow-hidden shadow-lg border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <img
        src={coverImageUrl}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        alt=""
      />

      <div className="absolute inset-4 bg-white/70 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center border border-white/50">
        {hostName && (
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl text-gray-800 mb-8 leading-tight`}
        >
          {template.name}
        </h2>
        <div className="px-6 py-2 border-y border-gray-300 text-sm font-serif text-gray-700">
          {dt.day} {dt.month} â€” {dt.time}
        </div>
      </div>
    </motion.div>
  );
}

// 58: Modern Serif Magazine
export function Design58({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f4f4f4] p-6 font-serif shadow-sm"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border-b border-black pb-4 mb-6 text-center">
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-black`}>
          {template.name}
        </h2>
      </div>
      <div className="w-full aspect-square mb-6">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex justify-between items-start text-sm">
        <div className="w-1/2 pr-2 border-r border-gray-300">
          <p className="font-bold uppercase text-[10px] text-gray-500 mb-1">CÃ©lÃ©bration</p>
          <p>
            {dt.day} {dt.month} {dt.year}
          </p>
        </div>
        <div className="w-1/2 pl-4 text-right">
          <p className="font-bold uppercase text-[10px] text-gray-500 mb-1">Rendez-vous</p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 59: Sage Botanica
export function Design59({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#eef1ed] p-8 flex flex-col justify-center items-center shadow-md"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-48 h-48 rounded-full bg-[#dce1da] mb-8 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover opacity-80 mix-blend-multiply"
          alt=""
        />
      </div>
      <div className="bg-white p-6 rounded-2xl text-center w-full shadow-sm">
        {hostName && (
          <p className="text-[10px] uppercase text-[#7a8c76] tracking-widest mb-2">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-[#4a5448] mb-4`}
        >
          {template.name}
        </h2>
        <div className="flex justify-center gap-4 text-xs font-medium text-[#7a8c76]">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 60: Terracotta Sun
export function Design60({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fcf8f5] border-[12px] border-[#e2a88d] p-6 shadow-xl flex flex-col text-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#bd6a4c] mb-6`}
        >
          {template.name}
        </h2>
        <div className="w-full aspect-[4/3] bg-gray-100 mb-6 shadow-md rounded-t-full">
          <img src={coverImageUrl} className="w-full h-full object-cover rounded-t-full" alt="" />
        </div>
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{hostName}</p>
        )}
        <div className="text-sm font-serif text-[#bd6a4c]">
          <p>
            {dt.day} {dt.month} Ã  {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
