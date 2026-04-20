"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const beats = [
  { html: "I kept seeing the <em>same thing.</em>" },
  { html: 'Men who built <em>real</em> careers.' },
  { html: "Who couldn\u2019t <em>fully experience</em> any of it." },
  { html: "The <em>stress accumulated.</em> The body <em>paid the price.</em>" },
  { html: 'That observation became an <em>obsession.</em>' },
];

export default function Observation() {
  const sectionRef = useBodyBackground<HTMLElement>("#1A1A1A");
  const beatsRef = useRef<HTMLDivElement>(null);
  const attrRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const beatsInView = useInView(beatsRef, { once: true, margin: "-80px" });
  const attrInView = useInView(attrRef, { once: true, margin: "-80px" });
  const labelInView = useInView(labelRef, { once: true, margin: "-80px" });
  const portraitInView = useInView(portraitRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative bg-carbon min-h-screen overflow-hidden"
    >
      {/* Two-column layout: content left, portrait right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] min-h-screen">

        {/* Left column — all content */}
        <div className="px-6 md:px-13 py-16 md:py-30">
          {/* Section label */}
          <motion.span
            ref={labelRef}
            initial={{ opacity: 0, x: -20 }}
            animate={labelInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="section-label text-white/35 block mb-16"
          >
            004 / Where this started
          </motion.span>

          {/* Five beats */}
          <div ref={beatsRef} className="mb-16 md:mb-24">
            {beats.map((beat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.12, x: -12 }}
                animate={beatsInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="obs-beat border-t border-eggshell/5 py-6"
              >
                <span
                  className="font-bebas text-eggshell uppercase"
                  style={{
                    fontSize: "clamp(36px, 10vw, 216px)",
                    lineHeight: 0.92,
                  }}
                  dangerouslySetInnerHTML={{ __html: beat.html }}
                />
              </motion.div>
            ))}
          </div>

          {/* Attribution row */}
          <motion.div
            ref={attrRef}
            initial={{ opacity: 0, y: 24 }}
            animate={attrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-8"
          >
            {/* 15 stat */}
            <div className="flex flex-col">
              <span
                className="font-bebas text-forest leading-none"
                style={{ fontSize: "clamp(52px, 14vw, 200px)" }}
              >
                15
              </span>
              <span
                className="font-dm font-normal text-white/30 uppercase tracking-[.2em] mt-1"
                style={{ fontSize: 20 }}
              >
                Age this began
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-forest/30 flex-shrink-0" />

            {/* Body */}
            <p
              className="font-dm font-light text-white/45 max-w-[400px]"
              style={{ fontSize: "clamp(15px, 2.4vw, 32px)", lineHeight: 1.8 }}
            >
              <strong className="text-white/75 font-normal">
                I spent years in the research
              </strong>{" "}
              — performance neuroscience, longevity medicine, mobility, stress
              physiology — and just as long figuring out what actually transfers
              when someone has a real schedule and real pressure.
            </p>
          </motion.div>
        </div>

        {/* Right column — portrait */}
        <motion.div
          ref={portraitRef}
          initial={{ opacity: 0, x: 40 }}
          animate={portraitInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
          className="hidden lg:block relative"
          style={{ minHeight: "100%" }}
        >
          {/* Gradient fade on left edge to blend with section bg */}
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #1A1A1A, transparent)",
            }}
          />
          {/* Gradient fade on bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #1A1A1A, transparent)",
            }}
          />
          <Image
            src="/miguel-jr.jpg"
            alt="Miguel Ángel Jr. — Health & Performance Coach"
            fill
            style={{ objectFit: "cover", objectPosition: "top center" }}
            sizes="(min-width: 1280px) 500px, 420px"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
