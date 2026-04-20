"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

const phases = [
  {
    number: "01",
    title: "Executive Reality Assessment",
    description:
      "Everything affecting your health is downstream of the environment you operate in. This phase maps that environment clearly — professional load, stress state, time architecture — before anything is built.",
  },
  {
    number: "02",
    title: "Lifestyle & Habit Diagnosis",
    description:
      "You have habits. The question is whether they're serving your long-term health — or just helping you survive your current pressure load. This phase produces a rational sequence for changing what's working against you.",
  },
  {
    number: "03",
    title: "Physical Baseline Evaluation",
    description:
      "Physical data placed in the context of the life carrying it. A reading isn't a judgment — it's a data point. The goal: understand exactly where you're starting from, so the plan that follows is calibrated to reality.",
  },
  {
    number: "04",
    title: "Strategic Alignment Plan",
    description:
      "A personalized roadmap built around your actual schedule, pressure points, history, and goals. Training, nutrition, and habit targets designed to hold up under real-world pressure and imperfect weeks.",
  },
];

export default function Process() {
  const sectionRef = useBodyBackground<HTMLElement>("#F0EDE6");
  const headerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const panelsInView = useInView(panelsRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="bg-cream min-h-screen pt-16 md:pt-30 pb-0 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ x: -80, opacity: 0 }}
        animate={headerInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="px-6 md:px-13 mb-18"
      >
        <span className="section-label text-slate block mb-8">
          006 / The process
        </span>
        <h2
          className="font-bebas text-carbon uppercase"
          style={{ fontSize: "clamp(44px, 18vw, 272px)", lineHeight: 0.9 }}
        >
          Four phases.
        </h2>
        <h2
          className="font-dm-serif italic text-carbon"
          style={{ fontSize: "clamp(44px, 18vw, 272px)", lineHeight: 0.9 }}
        >
          One objective.
        </h2>
        <p
          className="font-dm font-light text-graphite mt-6 max-w-[560px]"
          style={{ fontSize: "clamp(15px, 2.4vw, 32px)", lineHeight: 1.7 }}
        >
          <strong className="text-forest font-normal">
            Most programs begin with the body.
          </strong>{" "}
          This one begins with the life the body is living inside — because a
          plan that doesn&apos;t account for your actual environment won&apos;t
          survive contact with your actual week.
        </p>
      </motion.div>

      {/* Phase panels */}
      {!isMobile ? (
        /* Desktop: horizontal hover-expand panels */
        <div ref={panelsRef} className="flex" style={{ minHeight: "40vh" }}>
          {phases.map((phase, i) => {
            const isHov = hovered === i;
            return (
              <motion.div
                key={phase.number}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={panelsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  layout: {
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.6, delay: i * 0.08, ease: EASE },
                  y: { duration: 0.6, delay: i * 0.08, ease: EASE },
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="px-9 py-12 border-r border-forest/10 last:border-r-0"
                style={{
                  flex: isHov ? "1.65 1 0%" : "1 1 0%",
                  background: isHov ? "#1A1A1A" : "transparent",
                  transition:
                    "background 0.35s ease, flex 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Phase number */}
                <span
                  className="font-bebas block tracking-[-0.02em] mb-5"
                  style={{
                    fontSize: 128,
                    color: isHov
                      ? "rgba(45,106,45,0.6)"
                      : "rgba(45,106,45,0.15)",
                    transition: "color 0.35s ease",
                    lineHeight: 1,
                  }}
                >
                  {phase.number}
                </span>

                {/* Bar */}
                <div
                  style={{
                    height: 1,
                    width: isHov ? 32 : 20,
                    background: isHov
                      ? "#2D6A2D"
                      : "rgba(45,106,45,0.25)",
                    marginBottom: 20,
                    transition:
                      "width 0.35s ease, background 0.35s ease",
                  }}
                />

                {/* Title */}
                <span
                  className="font-dm font-medium uppercase tracking-[.14em] block"
                  style={{
                    fontSize: 22,
                    lineHeight: 1.5,
                    color: isHov ? "#F8F6F1" : "#23272E",
                    transition: "color 0.35s ease",
                  }}
                >
                  {phase.title}
                </span>

                {/* Description */}
                <div
                  style={{
                    maxHeight: isHov ? 200 : 0,
                    overflow: "hidden",
                    opacity: isHov ? 1 : 0,
                    transition:
                      "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                  }}
                >
                  <p
                    className="font-dm font-light mt-5"
                    style={{
                      fontSize: 26,
                      lineHeight: 1.75,
                      color: "rgba(248,246,241,0.5)",
                    }}
                  >
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Mobile: stacked, always show description */
        <div ref={panelsRef} className="flex flex-col px-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 20 }}
              animate={panelsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="border-t border-forest/10 py-8"
            >
              <span
                className="font-bebas block text-forest/15 mb-4"
                style={{ fontSize: 72, lineHeight: 1 }}
              >
                {phase.number}
              </span>
              <div className="h-px w-5 bg-forest/25 mb-4" />
              <span
                className="font-dm font-medium uppercase tracking-[.14em] text-iron block mb-4"
                style={{ fontSize: 14, lineHeight: 1.5 }}
              >
                {phase.title}
              </span>
              <p
                className="font-dm font-light text-graphite"
                style={{ fontSize: "clamp(15px, 4vw, 28px)", lineHeight: 1.75 }}
              >
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
