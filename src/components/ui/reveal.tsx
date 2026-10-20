import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  scale?: boolean;
  animationStyle?: "fade-blur" | "fade-slide" | "scale-up" | "none" | null;
}

export function Reveal({
  children,
  delay = 0,
  scale = false,
  animationStyle = "fade-blur",
}: RevealProps) {
  if (animationStyle === "none") {
    return <>{children}</>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initial: any = { opacity: 0 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let whileInView: any = { opacity: 1 };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transition: any = { duration: 1, delay, ease: "easeOut" };

  if (animationStyle === "fade-blur") {
    initial = { opacity: 0, y: 40, scale: scale ? 0.95 : 1, filter: "blur(4px)" };
    whileInView = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
    transition.ease = [0.25, 0.1, 0.25, 1];
  } else if (animationStyle === "fade-slide") {
    initial = { opacity: 0, y: 40 };
    whileInView = { opacity: 1, y: 0 };
    transition.duration = 0.8;
  } else if (animationStyle === "scale-up") {
    initial = { opacity: 0, scale: 0.9 };
    whileInView = { opacity: 1, scale: 1 };
    transition.duration = 0.6;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-10%" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
