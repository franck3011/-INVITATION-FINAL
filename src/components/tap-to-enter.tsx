import { motion } from "framer-motion";
import type { Template } from "@/lib/templates";

interface Props {
  template: Template;
  hostName?: string | null;
  title: string;
  onEnter: () => void;
}

/**
 * Lightweight overlay shown for templates without an envelope intro.
 * Acts as a user gesture so audio/music can autoplay on entry.
 */
export function TapToEnter({ template, hostName, title, onEnter }: Props) {
  const dark = template.dark;
  return (
    <motion.button
      type="button"
      onClick={onEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-center px-6 ${template.bgClass} ${dark ? "text-ivory" : "text-primary"}`}
    >
      <p className="text-xs uppercase tracking-[0.4em] opacity-70">
        Une invitation pour {hostName ?? "vous"}
      </p>
      <div className="my-6 text-5xl" aria-hidden>
        {template.emoji}
      </div>
      <h2
        className={
          template.titleFont === "script"
            ? "font-script text-4xl md:text-6xl"
            : "font-display text-3xl md:text-5xl"
        }
      >
        {title}
      </h2>
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-10 text-xs uppercase tracking-[0.4em]"
      >
        ✦ Touchez pour entrer ✦
      </motion.span>
    </motion.button>
  );
}
