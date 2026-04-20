"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    num: "01",
    label: "Energy",
    headline: "The fatigue that started as occasional.",
    body: "It used to be situational. Now it's the baseline. You perform at the same level — but what it costs to get there has quietly doubled.",
  },
  {
    num: "02",
    label: "Sleep",
    headline: "Seven hours that leave you more tired than six used to.",
    body: "The hours are there. The recovery isn't. Sleep has become something you do without the result it used to produce.",
  },
  {
    num: "03",
    label: "Cognition",
    headline: "The edge you built your career on.",
    body: "Decision-making, pattern recognition, the ability to hold complexity — these are the first things to go when the body is running on a degraded system.",
  },
  {
    num: "04",
    label: "Stability",
    headline: "Reactions that never used to happen.",
    body: "The irritability. The shortened fuse. This is neurological — not character. The body is sending signals the mind can't override.",
  },
  {
    num: "05",
    label: "Presence",
    headline: "The gap between who you are and what you look like.",
    body: "Walking into a room and having your physical presence reflect the level of person you are and what you've built. For most men here, that gap has been widening for years.",
  },
];

function CostCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-20 border-b border-eggshell/8 py-10 lg:py-14"
    >
      {/* Left — number + label + headline */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <span
            className="font-bebas text-forest"
            style={{ fontSize: "clamp(13px, 1.4vw, 18px)" }}
          >
            {card.num}
          </span>
          <span
            className="font-dm font-normal text-white/45 uppercase tracking-[.22em]"
            style={{ fontSize: 10 }}
          >
            {card.label}
          </span>
        </div>
        <h3
          className="font-bebas text-eggshell uppercase"
          style={{
            fontSize: "clamp(22px, 4vw, 56px)",
            lineHeight: 0.95,
          }}
        >
          {card.headline}
        </h3>
      </div>

      {/* Right — body */}
      <div className="flex items-center">
        <p
          className="font-dm font-light text-white/65 border-l border-forest/40 pl-6"
          style={{ fontSize: "clamp(14px, 1.5vw, 19px)", lineHeight: 1.85 }}
        >
          {card.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function CostSection() {
  const sectionRef = useBodyBackground<HTMLElement>("#1A1A1A");
  const labelRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(labelRef, { once: true, margin: "-60px" });
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const closingInView = useInView(closingRef, { once: true, margin: "-80px" });

  return (
    <>
      <section
        ref={(el) => {
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        className="bg-carbon px-6 md:px-13 py-16 md:py-35 overflow-hidden"
      >
        {/* Label */}
        <motion.span
          ref={labelRef}
          initial={{ opacity: 0, x: -20 }}
          animate={labelInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="section-label text-white/35 block mb-12 md:mb-20"
        >
          003 / The cost
        </motion.span>

        {/* Section headline */}
        <div ref={headRef} className="mb-4 md:mb-6">
          {["What high", "performance", "actually costs."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                animate={headInView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: i * 0.1, ease: EASE }}
                className={`font-bebas uppercase ${i === 2 ? "text-forest" : "text-eggshell"}`}
                style={{ fontSize: "clamp(28px, 9vw, 140px)", lineHeight: 0.9 }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="border-t border-eggshell/8 mt-12 md:mt-20">
          {cards.map((card, i) => (
            <CostCard key={card.num} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ── Cost Closing — "None of this is your fault." ── */}
      <section className="relative bg-carbon px-6 md:px-13 py-16 md:py-30 overflow-hidden border-t border-eggshell/5">
        {/* Ghost SYSTEM */}
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

        <div ref={closingRef}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="section-label text-white/35 block mb-12"
          >
            The conclusion
          </motion.span>

          {/* Headline */}
          <div className="mb-16 relative z-10">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                animate={closingInView ? { y: 0 } : {}}
                transition={{ duration: 0.85, ease: EASE }}
                className="font-bebas text-eggshell uppercase"
                style={{
                  fontSize: "clamp(40px, 13vw, 192px)",
                  lineHeight: 0.92,
                }}
              >
                None of this is your fault.
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                animate={closingInView ? { y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
                className="font-bebas text-forest uppercase"
                style={{
                  fontSize: "clamp(40px, 13vw, 192px)",
                  lineHeight: 0.92,
                }}
              >
                All of it can change.
              </motion.h2>
            </div>
          </div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="border-l border-forest/30 pl-6 max-w-[560px] relative z-10"
          >
            <p
              className="font-dm font-light text-white/50"
              style={{ fontSize: "clamp(15px, 2.4vw, 32px)", lineHeight: 1.85 }}
            >
              You didn&apos;t end up here because you stopped trying. You ended
              up here because you kept giving — and{" "}
              <strong className="text-white/80 font-normal">
                nothing in your system was built to grow with you
              </strong>{" "}
              as your life grew around you.
              <br />
              <br />
              That&apos;s the actual problem. Not discipline. Not effort. A
              system that was never designed to keep pace with the life you were
              building.
              <br />
              <br />
              <strong className="text-white/80 font-normal">
                This process is.
              </strong>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
