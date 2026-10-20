import React from "react";
import { getPalette, getTitleFontClass, fontVars } from "@/components/preview-invitation";
import { MapPin, Heart, Calendar, Clock, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GenerativeProps, parseDateParts } from "./shared";

// 13: Neo-Brutalism
export function Design13({
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-sm border-4 border-black"
      style={{ background: p.bg, color: p.text, ...fontVars(template, themeOverrides) }}
    >
      <div className="border-b-4 border-black p-4 bg-white">
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl uppercase tracking-tighter leading-none`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>
        {hostName && <p className="text-sm font-bold uppercase mt-2">{hostName}</p>}
      </div>
      <div className="w-full aspect-[4/3] border-b-4 border-black overflow-hidden relative group">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt=""
        />
        <div className="absolute inset-0 border-8 border-transparent group-hover:border-black/10 transition-colors" />
      </div>
      <div className="p-4 grid grid-cols-2 gap-4 bg-[#f0f0f0]">
        <div className="border-2 border-black p-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
          <Calendar className="w-6 h-6 mb-2" strokeWidth={3} />
          <p className="font-bold text-lg">
            {dt.day} {dt.month}
          </p>
          <p className="text-xs uppercase">{dt.year}</p>
        </div>
        <div className="border-2 border-black p-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
          <Clock className="w-6 h-6 mb-2" strokeWidth={3} />
          <p className="font-bold text-lg">{dt.time}</p>
          <p className="text-xs uppercase">Heure locale</p>
        </div>
      </div>
      <div
        className="p-4 border-t-4 border-black text-center"
        style={{ backgroundColor: p.accent }}
      >
        <p className="font-bold uppercase text-white tracking-widest text-sm">Save the date</p>
      </div>
    </motion.div>
  );
}

// 14: Glassmorphism
export function Design14({
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
      transition={{ duration: 0.8 }}
      className="mx-auto w-full max-w-sm relative min-h-[80vh] flex flex-col justify-end overflow-hidden rounded-3xl"
      style={{ color: p.text, ...fontVars(template, themeOverrides) }}
    >
      <img src={coverImageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 m-4 p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        {hostName && (
          <p className="text-white/80 text-xs tracking-widest uppercase mb-1">{hostName}</p>
        )}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl text-white mb-4 drop-shadow-md`}
        >
          {template.name}
        </h2>

        <div className="flex items-center gap-4 text-white/90 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />{" "}
            <span>
              {dt.day} {dt.month} {dt.year}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> <span>{dt.time}</span>
          </div>
        </div>

        <div className="h-px w-full bg-white/20 my-4" />
        <p className="text-white/60 text-xs italic text-center">
          Rejoignez-nous pour cette occasion spÃ©ciale
        </p>
      </div>
    </motion.div>
  );
}

// 15: Editorial Newspaper
export function Design15({
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
      className="mx-auto w-full max-w-sm bg-[#f9f9f9] text-[#111] font-serif p-6 border border-[#ddd] shadow-lg"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="border-b-2 border-black pb-4 mb-4 text-center">
        <p className="text-[10px] uppercase tracking-widest mb-2 font-sans">
          The Daily Celebration
        </p>
        <h2 className={`${getTitleFontClass(template, themeOverrides)} text-5xl leading-none`}>
          {template.name}
        </h2>
      </div>

      <div className="flex justify-between items-center text-[11px] font-sans border-b border-black pb-2 mb-4 uppercase tracking-wider">
        <span>Vol. I â€” No. 1</span>
        <span>
          {dt.weekday} {dt.day} {dt.month} {dt.year}
        </span>
        <span>Est. 2026</span>
      </div>

      <div className="columns-2 gap-4 mb-4 text-[10px] leading-relaxed text-justify">
        <p className="mb-2">
          <span className="text-3xl float-left mr-1 leading-none">
            {hostName?.charAt(0) || "I"}
          </span>
          {hostName ? hostName.slice(1) : "nvitation"} vous convie Ã  un Ã©vÃ©nement exceptionnel.
          La prÃ©sence de tous est vivement souhaitÃ©e pour partager ce moment inoubliable.
        </p>
        <p>
          Les festivitÃ©s dÃ©buteront Ã  {dt.time} prÃ©cises. Veuillez confirmer votre prÃ©sence en
          utilisant le formulaire de rÃ©ponse ci-joint.
        </p>
      </div>

      <figure className="w-full   transition-all duration-1000 mb-4 border border-black p-1 bg-white">
        <img src={coverImageUrl} className="w-full h-48 object-cover" alt="" />
        <figcaption className="text-[9px] text-center mt-1 uppercase">
          A moment captured in time
        </figcaption>
      </figure>
    </motion.div>
  );
}

// 16: Asymmetrical Split
export function Design16({
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] relative overflow-hidden bg-white shadow-xl"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* 60% Image split diagonally */}
      <div className="absolute top-0 right-0 w-[150%] h-[60%] origin-top-right -rotate-6 overflow-hidden">
        <img
          src={coverImageUrl}
          className="absolute w-full h-full object-cover rotate-6 scale-110"
          alt=""
        />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[50%] p-8 flex flex-col justify-end"
        style={{ background: p.bg, color: p.text }}
      >
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-5xl leading-tight mb-2`}
          style={{ color: p.titleColor }}
        >
          {template.name.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h2>

        <div className="flex gap-6 mt-4">
          <div className="border-l-2 pl-3" style={{ borderColor: p.accent }}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Date</p>
            <p className="font-semibold text-lg">
              {dt.day} {dt.month}
            </p>
          </div>
          <div className="border-l-2 pl-3" style={{ borderColor: p.accent }}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Time</p>
            <p className="font-semibold text-lg">{dt.time}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 17: Botanical Vellum
export function Design17({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#f8f6f0] p-6 relative flex items-center justify-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="absolute inset-4 border border-[#e0dcd0] z-0" />

      <div className="w-full aspect-[4/5] relative z-10 shadow-sm p-2 bg-white">
        <img src={coverImageUrl} className="w-full h-full object-cover opacity-90" alt="" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] p-6 bg-white/70 backdrop-blur-md border border-white shadow-lg text-center">
          {hostName && (
            <p className="text-[9px] uppercase tracking-widest text-[#888] mb-3">{hostName}</p>
          )}
          <h2
            className={"${getTitleFontClass(template, themeOverrides)} text-4xl mb-4"}
            style={{ color: p.titleColor || "#444" }}
          >
            {template.name}
          </h2>
          <div className="w-8 h-[1px] bg-[#ccc] mx-auto mb-4" />
          <p className="text-xs text-[#555] font-serif italic">
            {dt.day} {dt.month} • {dt.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// 18: Minimalist Swiss
export function Design18({
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
      className="mx-auto w-full max-w-sm bg-white p-8 min-h-[85vh] flex flex-col justify-between font-sans shadow-lg border border-gray-100"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div>
        {hostName && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-black mb-12">
            {hostName}
          </p>
        )}
        <h2
          className={`font-black text-5xl text-black leading-[0.9] tracking-tighter uppercase break-words mb-8`}
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          {template.name}
        </h2>
      </div>

      <div className="w-full aspect-square bg-gray-100 overflow-hidden mb-8">
        <img
          src={coverImageUrl}
          className="w-full h-full object-cover   transition-all duration-500"
          alt=""
        />
      </div>

      <div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">Date</p>
          <p className="text-sm font-semibold">
            {dt.day} {dt.month.substring(0, 3).toUpperCase()} {dt.year}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">Time</p>
          <p className="text-sm font-semibold">{dt.time}</p>
        </div>
      </div>
    </motion.div>
  );
}

// 19: Floating Cards
export function Design19({
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
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-gray-50 p-6 relative shadow-lg overflow-hidden flex items-center justify-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      {/* Background soft blur image */}
      <img
        src={coverImageUrl}
        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110"
        alt=""
      />

      <div className="relative z-10 w-full space-y-6">
        {/* Image Card */}
        <motion.div
          initial={{ y: 20, rotate: -2 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-full aspect-[4/3] bg-white p-2 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]"
        >
          <img src={coverImageUrl} className="w-full h-full object-cover rounded-lg" alt="" />
        </motion.div>

        {/* Title Card */}
        <motion.div
          initial={{ y: 20, rotate: 2 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-[90%] ml-auto bg-white p-6 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
          style={{ background: p.bg }}
        >
          {hostName && (
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
              {hostName}
            </p>
          )}
          <h2
            className={`${getTitleFontClass(template, themeOverrides)} text-3xl`}
            style={{ color: p.titleColor }}
          >
            {template.name}
          </h2>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ y: 20, rotate: -1 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="w-[80%] bg-white p-4 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex items-center gap-4"
          style={{ backgroundColor: p.accent }}
        >
          <div className="bg-white/20 p-3 rounded-lg text-white">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="text-white">
            <p className="font-semibold text-lg leading-tight">
              {dt.day} {dt.month}
            </p>
            <p className="text-white/80 text-sm leading-tight">{dt.time}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 20: Arch & Wave
export function Design20({
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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-sm min-h-[85vh] bg-[#faf8f5] p-6 shadow-xl text-center flex flex-col items-center"
      style={{ ...fontVars(template, themeOverrides) }}
    >
      <div className="w-full max-w-[240px] aspect-[1/1.5] rounded-t-full overflow-hidden mb-8 shadow-2xl border-4 border-white">
        <img src={coverImageUrl} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {(themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle) && (
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-gray-400 mb-2 font-sans">
            {themeOverrides?.ceremonyTitle || themeOverrides?.eventTitle}
          </p>
        )}
        {hostName && <p className="text-sm font-serif italic text-gray-500 mb-3">{hostName}</p>}
        <h2
          className={`${getTitleFontClass(template, themeOverrides)} text-4xl leading-tight mb-6`}
          style={{ color: p.titleColor }}
        >
          {template.name}
        </h2>

        <div className="flex items-center gap-6 font-serif">
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Le</p>
            <p className="text-xl font-medium" style={{ color: p.accent }}>
              {dt.day} {dt.month}
            </p>
          </div>
          <div className="w-px h-10 bg-gray-300" />
          <div className="text-left">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Ã€</p>
            <p className="text-xl font-medium" style={{ color: p.accent }}>
              {dt.time}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
