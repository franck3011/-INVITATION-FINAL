import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 81: Art Gallery
export function Design81({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-12 text-center font-sans shadow-lg border border-gray-100 flex flex-col items-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-8 border-b border-gray-200 pb-2 inline-block">
        Vernissage
      </p>
      <div className="w-[80%] aspect-[3/4] bg-gray-50 mb-10 shadow-2xl border-8 border-white">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>
      <h2
        className={`${getTitleFontClass(template, themeOverrides)} text-4xl font-light text-gray-900 mb-6 leading-tight`}
      >
        {template.name}
      </h2>
      {hostName && <p className="text-xs italic text-gray-500 mb-6">{hostName}</p>}
      <p className="text-[10px] uppercase tracking-widest text-gray-400">
        {dt.day} {dt.month} - {dt.time}
      </p>
    </motion.div>
  );
}

// 82: Sage Arch Minimal
export function Design82({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f2f4f1] p-8 flex flex-col shadow-md text-[#525950]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="text-center mb-8">
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl mb-4`}>
          {template.name}
        </h2>
        {hostName && <p className="text-[10px] uppercase tracking-widest opacity-60">{hostName}</p>}
      </div>
      <div className="flex-1 w-full rounded-t-[100px] bg-white overflow-hidden p-2 shadow-sm mb-6">
        <div className="w-full h-full rounded-t-[90px] overflow-hidden">
          <img src={coverImageUrl} className="w-full h-full object-cover opacity-90 " alt="" />
        </div>
      </div>
      <div className="flex justify-between items-center text-xs font-serif uppercase tracking-widest border-t border-[#d8dcd6] pt-4">
        <p>
          {dt.day} {dt.month}
        </p>
        <p>{dt.time}</p>
      </div>
    </motion.div>
  );
}

// 83: Double Frame Overlay
export function Design83({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-6 relative shadow-lg overflow-hidden"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-10 left-6 right-10 bottom-24 border border-gray-200" />
      <div className="absolute top-14 left-10 right-6 bottom-20 border border-gray-100" />

      <div className="relative z-10 w-full h-[50vh] bg-gray-50 mb-8 p-1 bg-white shadow-sm">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur text-center p-4">
        {hostName && (
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-4`}
        >
          {template.name}
        </h2>
        <div className="flex justify-center items-center gap-4 text-xs font-serif text-gray-500">
          <p>
            {dt.day} {dt.month}
          </p>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 84: French Window
export function Design84({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbfbf9] p-6 shadow-md font-serif"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="h-full border border-gray-200 p-2 flex flex-col">
        <div className="h-full border border-gray-200 p-4 flex flex-col justify-between">
          <div className="text-center pt-4">
            <h2
              className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-900 mb-2 leading-none`}
            >
              {template.name}
            </h2>
            {hostName && (
              <p className="text-[10px] uppercase text-gray-500 tracking-widest">{hostName}</p>
            )}
          </div>

          <div className="w-full grid grid-cols-2 gap-2 my-8">
            <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
              <img src={coverImageUrl} className="w-full h-full object-cover object-left" alt="" />
            </div>
            <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
              <img src={coverImageUrl} className="w-full h-full object-cover object-right" alt="" />
            </div>
          </div>

          <div className="text-center text-xs text-gray-600">
            <p className="uppercase tracking-widest">
              {dt.day} {dt.month} {dt.year}
            </p>
            <p className="mt-2 text-[10px]">{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 85: Soft Shadow Box
export function Design85({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fdfdfc] p-10 flex flex-col justify-center shadow-lg text-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full aspect-square rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-10 p-2 border border-gray-50">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
      <h2 className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-4`}>
        {template.name}
      </h2>
      {hostName && (
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">{hostName}</p>
      )}
      <div className="w-full border-t border-gray-100 pt-6">
        <p className="text-sm font-medium text-gray-600">
          {dt.day} {dt.month} - {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 86: Offset Text Overlay
export function Design86({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white p-6 shadow-xl relative"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-[85%] h-[60vh] bg-gray-100 absolute top-6 right-6">
        <img src={coverImageUrl} className="w-full h-full object-cover opacity-90" alt="" />
      </div>
      <div className="absolute bottom-12 left-6 bg-white/90 backdrop-blur p-8 shadow-2xl w-[90%] border border-gray-100">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl font-light text-gray-900 leading-[0.9] mb-6`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            {hostName}
          </p>
        )}
        <div className="flex gap-4 text-xs font-serif text-gray-600 border-t border-gray-200 pt-4">
          <p>
            {dt.day} {dt.month}
          </p>
          <p>{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 87: Ivory & Gold Classic
export function Design87({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbfaf5] p-8 text-center shadow-lg border border-[#f0ecd8]"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border border-[#e6debb] p-6 h-full flex flex-col justify-between">
        <div>
          {hostName && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a89b6b] mb-4">{hostName}</p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-[#3b3a36] mb-8`}
          >
            {template.name}
          </h2>
        </div>
        <div className="w-full aspect-[4/3] bg-gray-100 mb-8 border border-[#e6debb] p-1">
          <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
        </div>
        <div className="text-[#8c825a] font-serif">
          <p className="text-lg">
            {dt.day} {dt.month}
          </p>
          <p className="text-sm mt-1">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 88: Modern Block
export function Design88({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-white shadow-xl flex flex-col overflow-hidden border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="h-[45vh] w-full bg-gray-100">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>
      <div className="p-8 bg-white flex-1 flex flex-col justify-center">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-black font-bold mb-4 uppercase leading-none`}
        >
          {template.name}
        </h2>
        {hostName && (
          <p className="text-[10px] uppercase text-gray-500 tracking-widest mb-8">{hostName}</p>
        )}
        <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t border-gray-200 pt-4">
          <div>
            <p className="text-gray-400 uppercase tracking-widest mb-1">Date</p>
            <p>
              {dt.day} {dt.month}
            </p>
          </div>
          <div>
            <p className="text-gray-400 uppercase tracking-widest mb-1">Time</p>
            <p>{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 89: Organic Watercolor
export function Design89({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fafafa] p-8 relative flex flex-col items-center justify-center text-center shadow-lg"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl" />

      <div className="relative z-10 w-[80%] aspect-square bg-white rounded-full overflow-hidden p-2 shadow-sm mb-10 border border-gray-100">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={coverImageUrl}
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
            alt=""
          />
        </div>
      </div>
      <div className="relative z-10">
        {hostName && (
          <p className="text-[10px] uppercase text-gray-400 tracking-[0.3em] mb-4">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-gray-800 mb-6`}
        >
          {template.name}
        </h2>
        <p className="text-sm italic font-serif text-gray-600">
          {dt.day} {dt.month} - {dt.time}
        </p>
      </div>
    </motion.div>
  );
}

// 90: Minimalist Book Cover
export function Design90({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#fbfbf9] p-8 shadow-md border-l-[16px] border-[#e2e0d8] flex flex-col font-serif"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border-b border-gray-200 pb-4 mb-8">
        {hostName && (
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl text-gray-900 leading-[1.1]`}
        >
          {template.name}
        </h2>
      </div>
      <div className="w-full aspect-[4/5] bg-gray-50 mb-8 border border-gray-100 p-2 shadow-inner">
        <img src={coverImageUrl} className="w-full h-full object-cover " alt="" />
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-gray-500 flex justify-between">
        <p>Vol. I</p>
        <p>
          {dt.day} {dt.month.substring(0, 3)} â€¢ {dt.time}
        </p>
      </div>
    </motion.div>
  );
}
