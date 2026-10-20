import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 71: Classic Editorial
export function Design71({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-6 shadow-sm font-serif border border-gray-100 flex flex-col"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="text-center mb-6">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-light text-gray-900`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-4">{hostName}</p>
        )}
      </div>
      <div className="w-full flex-1 bg-gray-50 mb-6 p-2 shadow-inner">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>
      <div className="grid grid-cols-3 text-center border-t border-b border-gray-200 py-4 text-gray-700">
        <div className="border-r border-gray-200">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Jour</p>
          <p className="text-sm">{dt.day}</p>
        </div>
        <div className="border-r border-gray-200">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Mois</p>
          <p className="text-sm">{dt.month}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Heure</p>
          <p className="text-sm">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 72: Silk & Shadow
export function Design72({
  template,
  coverImageUrl,
  hostName,
  eventDate,
  themeOverrides,
}: GenerativeProps) {
  const dt = parseDateParts(eventDate);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f8f7f5] shadow-2xl overflow-hidden relative flex flex-col justify-between"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-square relative shadow-lg z-10">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8f7f5]" />
      </div>
      <div className="p-8 pt-0 text-center relative z-20 flex-1 flex flex-col justify-end">
        {hostName && <p className="text-xs italic text-gray-500 mb-4">{hostName}</p>}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-8 leading-tight`}
        >
          {template.name}
        </h2>
        <div className="flex justify-center gap-6 font-medium text-xs tracking-widest uppercase text-[#888]">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 73: Asymmetric Cream
export function Design73({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fcfbf9] p-8 font-sans shadow-md border-r-8 border-[#e8e4db]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-[110%] -ml-8 aspect-[4/3] bg-gray-100 mb-12 shadow-lg">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="pl-4 border-l border-[#e8e4db]">
        {hostName && (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
            {hostName}
          </p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 mb-8`}
        >
          {template.name}
        </h2>
        <p className="text-xs font-medium text-gray-600 uppercase tracking-widest">
          {dt.day} {dt.month} {dt.year}
        </p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 74: Floating Polaroids Luxe
export function Design74({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f0ede6] p-6 shadow-xl relative overflow-hidden"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-10 right-10 w-2/3 aspect-[3/4] bg-white p-3 pb-12 shadow-2xl rotate-6">
        <img src={coverImageUrl} className="w-full h-full object-cover  opacity-50" alt="" />
      </div>
      <div className="absolute top-20 left-6 w-3/4 aspect-[3/4] bg-white p-3 pb-12 shadow-xl -rotate-3 border border-gray-100">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute bottom-10 left-6 right-6 bg-white/80 backdrop-blur-md p-6 text-center shadow-lg">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-gray-800 mb-2`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] uppercase text-gray-500 mb-4 tracking-widest">{hostName}</p>
        )}
        <p className="text-sm font-serif italic text-gray-600">
          {dt.day} {dt.month} â€¢ {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 75: Vellum Overlay
export function Design75({
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
      className="mx-auto w-full max-w-sm h-[85vh] relative shadow-lg border border-gray-200"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <img src={coverImageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute inset-x-4 top-1/4 bottom-8 bg-white/70 backdrop-blur-xl p-8 border border-white/50 shadow-2xl flex flex-col items-center justify-center text-center">
        {hostName && (
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-6">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 mb-8 leading-tight`}
        >
          {template.name}
        </h2>
        <div className="w-full border-t border-gray-300 pt-6">
          <p className="text-xs uppercase tracking-widest text-gray-600">
            {dt.day} {dt.month}
          </p>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-2">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 76: Botanical Frame
export function Design76({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fcfaf7] p-4 shadow-sm border border-[#e8e3db]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border border-[#c6c1b3] p-4 h-full flex flex-col">
        <div className="text-center mb-6 pt-4">
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-3xl text-[#5c584a] mb-2`}
          >
            {template.name}
          </h2>
          {hostName && (
            <p className="text-[10px] uppercase text-[#969181] tracking-widest">{hostName}</p>
          )}
        </div>
        <div className="flex-1 w-full rounded-t-full bg-gray-100 overflow-hidden mb-6 border-b-4 border-[#c6c1b3]">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90 " alt="" />
        </div>
        <div className="text-center pb-4 text-xs font-medium uppercase tracking-widest text-[#757161]">
          {dt.day} {dt.month} {dt.year} - {dt.time}
        </div>
      </div>
    </motion.div>
  );
}

// 77: Modern Triptych
export function Design77({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-6 shadow-xl flex flex-col justify-between"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="flex justify-between gap-2 h-[40vh] mb-8">
        <div className="w-1/3 bg-gray-100 overflow-hidden">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover scale-150 origin-top-left"
            alt=""
          />
        </div>
        <div className="w-1/3 bg-gray-100 overflow-hidden">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover scale-150 origin-center"
            alt=""
          />
        </div>
        <div className="w-1/3 bg-gray-100 overflow-hidden">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover scale-150 origin-bottom-right"
            alt=""
          />
        </div>
      </div>
      <div className="text-center">
        {hostName && (
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] mb-4">
            {hostName}
          </p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 mb-8`}
        >
          {template.name}
        </h2>
        <div className="flex justify-center items-center gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold border-t border-gray-100 pt-6">
          <p>
            {dt.day} {dt.month}
          </p>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 78: Blush Minimal
export function Design78({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#faf5f5] p-10 font-sans shadow-sm flex flex-col border border-[#f0e6e6]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#4a3f3f] mb-8`}>
        {template.name}
      </h2>
      <div className="w-full aspect-square bg-[#f0e6e6] mb-8 overflow-hidden shadow-inner">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover mix-blend-multiply opacity-80"
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col justify-end">
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-[#8a7575] mb-4">{hostName}</p>
        )}
        <p className="text-sm font-medium text-[#4a3f3f]">
          {dt.day} {dt.month} {dt.year}
        </p>
        <p className="text-sm text-[#8a7575] mt-1">{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 79: Organic Shape Mask
export function Design79({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbfbf9] p-8 text-center shadow-lg border border-gray-50"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div
        className="w-full aspect-[4/5] bg-gray-100 mx-auto mb-10 overflow-hidden shadow-sm"
        style={{ borderRadius: "60% 40% 50% 50% / 40% 50% 50% 60%" }}
      >
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>
      {hostName && <p className="text-xs font-serif italic text-gray-500 mb-4">{hostName}</p>}
      <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-6`}>
        {template.name}
      </h2>
      <p className="text-xs uppercase tracking-widest text-gray-400">
        {dt.day} {dt.month} â€¢ {dt.time}
      </p>
    </motion.div>
  );
}

// 80: Golden Ratio Typography
export function Design80({
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
      className="mx-auto w-full max-w-sm h-[85vh] flex shadow-2xl overflow-hidden bg-white"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-[38.2%] bg-gray-100 h-full relative">
        <img src={coverImageUrl} className="w-full h-full object-cover  opacity-90" alt="" />
      </div>
      <div className="w-[61.8%] h-full p-8 flex flex-col justify-center border-l border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
          Exhibition
        </p>
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-black leading-[1.1] mb-8 break-words`}
        >
          {template.name}
        </h2>
        {hostName && <p className="text-xs italic text-gray-500 mb-8">{hostName}</p>}
        <div className="pt-6 border-t border-gray-200 text-sm font-medium uppercase tracking-widest text-gray-800">
          <p>
            {dt.day} {dt.month}
          </p>
          <p className="text-gray-400 mt-1">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}
