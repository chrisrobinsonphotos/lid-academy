"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMBED_URL =
  "https://www.youtube.com/embed/ovHjpiCy-3E?autoplay=1&rel=0&modestbranding=1";

export default function VideoSection() {
  const sectionRef = useBodyBackground<HTMLElement>("#23272E");
  const innerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(innerRef, { once: true, margin: "-80px" });
  const [playing, setPlaying] = useState(false);

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="bg-iron min-h-screen px-6 md:px-13 py-12 md:py-20 flex flex-col justify-center overflow-hidden"
    >
      <div ref={innerRef}>
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-15 items-end mb-12">
          {/* Headline — clip wipe */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <h2
              className="font-bebas text-eggshell uppercase"
              style={{
                fontSize: "clamp(28px, 12vw, 200px)",
                lineHeight: 0.9,
              }}
            >
              6 minutes is what
              <br />
              I&apos;m asking you to{" "}
              <span className="text-forest">invest.</span>
            </h2>
          </motion.div>

          {/* Pre-sell text */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="max-w-[340px] text-right"
          >
            <p
              className="font-dm font-light text-white/65"
              style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.8 }}
            >
              <strong className="text-eggshell font-normal">
                This isn&apos;t an intro video.
              </strong>{" "}
              It&apos;s the actual process of diagnosis — applied to the
              specific situation of a high-performing man whose physical state
              has fallen behind his professional one.
            </p>
            <p
              className="font-dm font-light text-white/65 mt-3"
              style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.8 }}
            >
              Most people who watch it say it&apos;s the first time someone
              named what was actually happening.
            </p>
            <p
              className="font-dm font-normal text-forest uppercase tracking-[.14em] mt-3 pt-3 border-t border-forest/30"
              style={{ fontSize: 18 }}
            >
              Direct to camera · No slides · No pitch
            </p>
            {/* Bridge line — trajectory stakes before play */}
            <p
              className="font-dm-serif italic text-white/75 mt-6"
              style={{ fontSize: "clamp(14px, 1.6vw, 20px)", lineHeight: 1.65 }}
            >
              This is where you decide whether the next twenty years look different — or not.
            </p>
          </motion.div>
        </div>

        {/* Video frame */}
        <motion.div
          initial={{ scaleY: 0.92, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative w-full bg-carbon border border-forest/15 overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          {/* Scanline overlay */}
          <div className="scanlines absolute inset-0 z-10 pointer-events-none" />

          {/* Corner marks */}
          <div className="corner-mark-tl z-20" />
          <div className="corner-mark-br z-20" />

          {playing ? (
            <iframe
              src={EMBED_URL}
              className="absolute inset-0 w-full h-full z-30"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title="LID Academy — 6 Minute Video"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              {/* Play button */}
              <button
                onClick={() => setPlaying(true)}
                className="w-[76px] h-[76px] rounded-full border border-forest/50 flex items-center justify-center group hover:bg-forest transition-colors duration-300 mb-5"
                aria-label="Play 6-minute video"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-eggshell ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span
                className="font-bebas text-forest uppercase tracking-[.22em] px-4 py-1.5 border border-forest/60"
                style={{ fontSize: 18 }}
              >
                Watch the 6-minute video
              </span>
            </div>
          )}
        </motion.div>

        {/* Micro-CTA — text only, for high-intent visitors post-video */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="font-dm font-light text-white/55 text-center mt-6 tracking-[.06em]"
          style={{ fontSize: "clamp(12px, 1.3vw, 16px)" }}
        >
          If that felt like it was written specifically about you — the booking link is below.
        </motion.p>
      </div>
    </section>
  );
}
