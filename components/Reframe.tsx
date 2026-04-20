"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const lines = [
  { text: "Operating at", color: "text-eggshell" },
  { text: "this level", color: "text-forest" },
  { text: "takes more", color: "text-eggshell" },
  { text: "than people see.", color: "text-eggshell" },
];

export default function Reframe() {
  const sectionRef = useBodyBackground<HTMLElement>("#1A1A1A");
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px" });
  const labelInView = useInView(labelRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative bg-carbon min-h-screen flex flex-col justify-center px-6 md:px-13 py-16 md:py-30 overflow-hidden"
    >
      {/* Ghost "SYSTEM" */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-bebas ghost-system whitespace-nowrap"
          style={{ fontSize: "22vw", lineHeight: 0.85 }}
        >
          SYSTEM
        </span>
      </div>

      {/* Section label */}
      <motion.span
        ref={labelRef}
        initial={{ opacity: 0, x: -20 }}
        animate={labelInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="section-label text-white/35 mb-12 md:mb-20 block"
      >
        002 / Why it happened
      </motion.span>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        {/* Headline */}
        <div ref={headRef} className="lg:w-1/2">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                animate={headInView ? { y: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: i * 0.12,
                  ease: EASE,
                }}
                className={`font-bebas uppercase ${line.color}`}
                style={{
                  fontSize: "clamp(28px, 12vw, 200px)",
                  lineHeight: 0.88,
                }}
              >
                {line.text}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Body copy — right aligned */}
        <motion.div
          ref={bodyRef}
          initial={{ x: 60, opacity: 0 }}
          animate={bodyInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="lg:w-1/2 flex justify-end"
        >
          <div
            className="border-l border-forest pl-7"
            style={{ maxWidth: 460 }}
          >
            <p
              className="font-dm font-light text-white/70 reframe-body"
              style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.85 }}
            >
              The late night that feels like the only hour that still belongs to you.
              <br /><br />
              The caffeine that used to close the gap — and no longer does.
              <br /><br />
              The stiffness that arrived gradually and never fully left.
              <br /><br />
              The patience that used to come easily.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
