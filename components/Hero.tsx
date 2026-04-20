"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const diagLines = [
  { text: "You perform at the highest level of your career", highlight: false },
  { text: "Your physical state no longer reflects that", highlight: false },
  { text: "You've tried to close the gap. It hasn't stuck", highlight: false },
  { text: "This is not a discipline problem", highlight: true },
];

export default function Hero() {
  const sectionRef = useBodyBackground<HTMLElement>("#F8F6F1");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (heroRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el as HTMLDivElement;
      }}
      className="relative min-h-screen bg-eggshell overflow-hidden flex flex-col justify-end pb-18 px-6 md:px-13"
    >
      {/* Ghost "LID" — top-right, parallax */}
      <motion.div
        style={{ y: ghostY }}
        className="absolute top-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-bebas ghost-lid"
          style={{ fontSize: "42vw", lineHeight: 0.85 }}
        >
          LID
        </span>
      </motion.div>

      {/* Right diagnostic column — desktop only */}
      <div className="hidden lg:flex flex-col absolute right-13 top-1/2 -translate-y-1/2 z-10">
        {diagLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.9 + i * 0.15,
              ease: EASE,
            }}
            className={`px-5 py-3.5 border-l border-forest/25 max-w-[420px] ${
              i < diagLines.length - 1 ? "border-b border-forest/8" : ""
            }`}
          >
            <span
              className={`font-dm uppercase tracking-[.18em] ${
                line.highlight
                  ? "text-forest font-medium"
                  : "text-slate font-normal"
              }`}
              style={{ fontSize: 20 }}
            >
              {line.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        className="font-dm font-normal text-forest uppercase tracking-[.22em] mb-6 relative z-10"
        style={{ fontSize: 18 }}
      >
        001 / LID Academy · Miguel Ángel Jr
      </motion.p>

      {/* Headline — staggered line reveals */}
      <div className="relative z-10">
        {(["You didn't get here", "by lacking"] as const).map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.5 + i * 0.15,
                ease: EASE,
              }}
              className="font-bebas text-carbon uppercase"
              style={{
                fontSize: "clamp(52px, 25vw, 400px)",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
              }}
            >
              {line}
            </motion.h1>
          </div>
        ))}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            className="font-bebas text-forest uppercase"
            style={{
              fontSize: "clamp(52px, 25vw, 400px)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
            }}
          >
            discipline.
          </motion.h1>
        </div>
      </div>

      {/* Sub copy */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
        className="font-dm font-light text-graphite relative z-10 mt-9"
        style={{ fontSize: "clamp(15px, 2.4vw, 34px)", maxWidth: 560 }}
      >
        So why does your health keep falling behind? This is worth 6 minutes of
        your time.
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8, ease: EASE }}
        className="absolute bottom-8 right-13 flex items-center gap-3"
      >
        <span
          className="font-dm font-normal text-slate uppercase tracking-[.2em]"
          style={{ fontSize: 18 }}
        >
          SCROLL
        </span>
        <div className="relative w-16 h-px bg-slate/20">
          <div className="scroll-dot absolute top-1/2 w-1.5 h-1.5 rounded-full bg-forest" />
        </div>
      </motion.div>
    </section>
  );
}
