"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Booking() {
  const sectionRef = useBodyBackground<HTMLElement>("#1A1A1A");
  const innerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(innerRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative bg-carbon min-h-screen px-6 md:px-13 py-16 md:py-35 overflow-hidden"
    >
      {/* Ghost "BOOK" */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-bebas ghost-book whitespace-nowrap"
          style={{ fontSize: "28vw", lineHeight: 0.85 }}
        >
          BOOK
        </span>
      </div>

      <div ref={innerRef}>
        {/* Opening quote */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="border-l border-forest/30 pl-5 mb-10 max-w-[620px]"
        >
          <p
            className="font-dm-serif italic text-white/55"
            style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.7 }}
          >
            &ldquo;Most men who come to this process have already tried.
            They&apos;re not here because they gave up. They&apos;re here
            because they&apos;re done trying things that weren&apos;t built for
            them.&rdquo;
          </p>
        </motion.div>

        {/* Section label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="section-label text-white/35 block mb-10"
        >
          007 / Start here
        </motion.span>

        {/* Headline */}
        <div className="mb-20 relative z-10">
          {(["Book your"] as const).map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: i * 0.12, ease: EASE }}
                className="font-bebas text-eggshell uppercase"
                style={{
                  fontSize: "clamp(28px, 12vw, 200px)",
                  lineHeight: 0.88,
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
              className="font-bebas text-forest uppercase"
              style={{
                fontSize: "clamp(28px, 12vw, 200px)",
                lineHeight: 0.88,
              }}
            >
              assessment.
            </motion.h2>
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
          {/* Left */}
          <motion.div
            initial={{ x: -70, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <p
              className="font-dm font-light text-white/70 mb-9"
              style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.85 }}
            >
              A structured conversation about where you are, what you&apos;ve
              tried, and what&apos;s actually getting in the way. No programs
              sold on this call.
            </p>

            {/* Scarcity bar */}
            <div className="border-t border-b border-forest/25 py-4 mb-12">
              <p
                className="font-dm font-normal text-forest uppercase tracking-[.16em]"
                style={{ fontSize: 18, lineHeight: 1.65 }}
              >
                I work with a maximum of 50 clients per year.
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://calendly.com/PLACEHOLDER"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[18px] bg-forest text-eggshell font-dm font-normal uppercase tracking-[.2em] px-12 py-5 no-underline hover:bg-growth hover:-translate-y-0.5 transition-all duration-300 group"
              style={{ fontSize: 18 }}
            >
              Book your initial assessment
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* Fine print */}
            <p
              className="font-dm font-light text-white/40 mt-[18px] tracking-[.08em]"
              style={{ fontSize: 18 }}
            >
              If after that conversation this isn&apos;t the right fit,
              I&apos;ll say so — and point you toward something that is.
            </p>
          </motion.div>

          {/* Right — testimonial */}
          <motion.div
            initial={{ x: 70, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="lg:self-center"
          >
            <div className="border-l border-forest pl-8">
              <p
                className="font-dm-serif italic text-white/80 mb-6"
                style={{
                  fontSize: "clamp(18px, 3.2vw, 44px)",
                  lineHeight: 1.6,
                }}
              >
                &ldquo;Before this I was sleeping 7 hours and waking up
                exhausted. Six weeks in, I understood why — and it had nothing
                to do with sleep. My energy has been different since.&rdquo;
              </p>
              <span
                className="font-dm font-normal text-white/30 uppercase tracking-[.16em]"
                style={{ fontSize: 18 }}
              >
                Business owner, 41 · Client outcome
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
