import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Template } from "@/lib/templates";

/**
 * Floating animated particles overlay driven by the template's `effect` field.
 * Renders nothing for "minimal" / "confetti" (confetti fires on RSVP).
 * All particles are absolutely positioned and pointer-events-none.
 */
export function TemplateEffects({
  template,
  density = 1,
  className = "",
}: {
  template: Template;
  density?: number;
  className?: string;
}) {
  const effect = template.effect;
  if (effect === "minimal" || effect === "confetti") return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {effect === "petals" && <Petals density={density} dark={!!template.dark} />}
      {effect === "butterflies" && <Butterflies density={density} />}
      {effect === "leaves" && <Leaves density={density} />}
      {effect === "lights" && <Lights density={density} />}
      {effect === "deco" && <Sparkles density={density} />}
      {effect === "ribbon" && <Ribbons density={density} dark={!!template.dark} />}
      {effect === "torn-paper" && <TornPaper />}
    </div>
  );
}

/* ---- helpers ---- */
function rand(seed: number) {
  // deterministic pseudo-random for stable SSR/CSR layout
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}
function useParticles(count: number, salt = 0) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        left: rand(i + salt) * 100,
        delay: rand(i + salt + 1) * 6,
        duration: 8 + rand(i + salt + 2) * 10,
        size: 0.6 + rand(i + salt + 3) * 0.9,
        rotate: rand(i + salt + 4) * 360,
        drift: -30 + rand(i + salt + 5) * 60,
      })),
    [count, salt],
  );
}

/* ---- effects ---- */
function Petals({ density, dark }: { density: number; dark: boolean }) {
  const items = useParticles(Math.round(14 * density), 1);
  const colors = dark ? ["#f4c2c2", "#e8a4b8"] : ["#f7c5d3", "#e8a4b8", "#fbe1e7"];
  return (
    <>
      {items.map((p) => (
        <motion.div
          key={p.i}
          className="absolute -top-8"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["-5vh", "110vh"],
            x: [0, p.drift, -p.drift / 2, p.drift],
            rotate: [0, 180, 360, 540],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={14 * p.size} height={14 * p.size} viewBox="0 0 14 14">
            <path
              d="M7 1 C 11 4, 11 8, 7 13 C 3 8, 3 4, 7 1 Z"
              fill={colors[p.i % colors.length]}
              opacity="0.85"
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

function Butterflies({ density }: { density: number }) {
  const items = useParticles(Math.round(8 * density), 7);
  const colors = ["#a070d6", "#c79be8", "#7d4fbe", "#e0c2f5"];
  return (
    <>
      {items.map((p) => (
        <motion.div
          key={p.i}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${10 + ((p.i * 11) % 70)}%` }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 60, -40, 80, 0],
            y: [0, -30, 20, -10, 0],
            opacity: [0, 1, 1, 1, 0.8],
          }}
          transition={{
            duration: p.duration + 4,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Butterfly color={colors[p.i % colors.length]} size={18 * p.size} />
        </motion.div>
      ))}
    </>
  );
}
function Butterfly({ color, size }: { color: string; size: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      animate={{ scaleX: [1, 0.4, 1, 0.4, 1] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 12 C 8 4, 2 4, 2 10 C 2 14, 8 14, 12 12 Z" fill={color} opacity="0.85" />
      <path d="M12 12 C 16 4, 22 4, 22 10 C 22 14, 16 14, 12 12 Z" fill={color} opacity="0.85" />
      <ellipse cx="12" cy="12" rx="0.8" ry="5" fill="#3a2a4a" />
    </motion.svg>
  );
}

function Leaves({ density }: { density: number }) {
  const items = useParticles(Math.round(12 * density), 13);
  return (
    <>
      {items.map((p) => (
        <motion.div
          key={p.i}
          className="absolute -top-8"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, opacity: 0 }}
          animate={{
            y: ["-5vh", "110vh"],
            x: [0, 40, -40, 30],
            rotate: [0, 90, -90, 180, 360],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.duration + 4,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={16 * p.size} height={10 * p.size} viewBox="0 0 16 10">
            <ellipse cx="8" cy="5" rx="7" ry="3" fill="#7ba374" opacity="0.85" />
            <path d="M1 5 H 15" stroke="#3f5a3a" strokeWidth="0.5" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

function Lights({ density }: { density: number }) {
  const items = useParticles(Math.round(28 * density), 21);
  return (
    <>
      {items.map((p) => (
        <motion.div
          key={p.i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${rand(p.i + 99) * 100}%`,
            width: 3 + p.size * 4,
            height: 3 + p.size * 4,
            background: "radial-gradient(circle, #ffe9a8 0%, rgba(255,233,168,0) 70%)",
          }}
          animate={{ opacity: [0, 1, 0.3, 1, 0], scale: [0.8, 1.3, 1, 1.2, 0.8] }}
          transition={{
            duration: 2 + p.size * 2,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function Sparkles({ density }: { density: number }) {
  const items = useParticles(Math.round(18 * density), 31);
  return (
    <>
      {items.map((p) => (
        <motion.svg
          key={p.i}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${rand(p.i + 50) * 100}%` }}
          width={10 + p.size * 10}
          height={10 + p.size * 10}
          viewBox="0 0 12 12"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6], rotate: [0, 90] }}
          transition={{ duration: 2.5, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M6 0 L 7 5 L 12 6 L 7 7 L 6 12 L 5 7 L 0 6 L 5 5 Z" fill="#e6c570" />
        </motion.svg>
      ))}
    </>
  );
}

function Ribbons({ density, dark }: { density: number; dark: boolean }) {
  const items = useParticles(Math.round(6 * density), 41);
  const color = dark ? "#e6c570" : "#9a6e41";
  return (
    <>
      {items.map((p) => (
        <motion.svg
          key={p.i}
          className="absolute -top-12"
          style={{ left: `${p.left}%` }}
          width="40"
          height="120"
          viewBox="0 0 40 120"
          animate={{ y: ["-20vh", "120vh"], rotate: [0, 30, -30, 0] }}
          transition={{
            duration: p.duration + 6,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path
            d="M20 0 Q 30 30 20 60 Q 10 90 20 120"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
        </motion.svg>
      ))}
    </>
  );
}

function TornPaper() {
  return (
    <>
      <svg
        className="absolute top-0 left-0 right-0 w-full"
        height="40"
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 H 800 V 18 L 760 22 L 720 14 L 680 26 L 640 16 L 600 24 L 560 14 L 520 28 L 480 18 L 440 26 L 400 14 L 360 24 L 320 16 L 280 26 L 240 14 L 200 22 L 160 16 L 120 26 L 80 16 L 40 22 L 0 16 Z"
          fill="rgba(255,255,255,0.85)"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        height="40"
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 H 800 V 22 L 760 16 L 720 26 L 680 14 L 640 24 L 600 16 L 560 26 L 520 12 L 480 22 L 440 14 L 400 26 L 360 16 L 320 24 L 280 14 L 240 26 L 200 18 L 160 24 L 120 14 L 80 24 L 40 18 L 0 24 Z"
          fill="rgba(255,255,255,0.85)"
        />
      </svg>
    </>
  );
}
