"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCounter } from "@/hooks/useCounter";
import { useBodyBackground } from "@/hooks/useBodyBackground";

const EASE = [0.16, 1, 0.3, 1] as const;

interface StatDef {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatDef[] = [
  { value: 150, suffix: "+", label: "Clients through the process" },
  { value: 6, suffix: "mo", label: "Minimum engagement — built that way for a reason" },
  { value: 50, suffix: "/yr", label: "Maximum clients per year — capacity is the design" },
  { value: 15, suffix: "", label: "Age this obsession began" },
];

function StatItem({
  stat,
  triggered,
  index,
}: {
  stat: StatDef;
  triggered: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, 1600, triggered);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      className={`pt-11 pb-11 ${index < stats.length - 1 ? "border-r border-forest/10" : ""} px-6 md:px-8 first:pl-0`}
    >
      <div className="flex items-baseline leading-none mb-2">
        <span
          className="font-bebas text-carbon tracking-[-0.03em]"
          style={{ fontSize: "clamp(28px, 12vw, 200px)", lineHeight: 1 }}
        >
          {count}
        </span>
        {stat.suffix && (
          <span
            className="font-bebas text-forest"
            style={{ fontSize: 18 }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <p
        className="font-dm font-normal text-slate uppercase tracking-[.15em] max-w-[180px]"
        style={{ fontSize: 18, lineHeight: 1.6 }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Proof() {
  const sectionRef = useBodyBackground<HTMLElement>("#F8F6F1");
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const labelInView = useInView(labelRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="bg-eggshell min-h-screen px-6 md:px-13 py-16 md:py-35 overflow-hidden"
    >
      {/* Label */}
      <motion.span
        ref={labelRef}
        initial={{ opacity: 0, x: -20 }}
        animate={labelInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="section-label text-slate block mb-16 md:mb-25"
      >
        005 / The work behind it
      </motion.span>

      {/* Two-column grid */}
      <div
        ref={headRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-25 mb-25"
      >
        {/* Left — quote + answer */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={headInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p
            className="font-dm-serif italic text-carbon"
            style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.55 }}
          >
            &ldquo;If I saw this person walk into a meeting without knowing who
            they were — would their physical presence reflect the level of
            person they are and what they&apos;ve built?&rdquo;
          </p>
          <p
            className="font-bebas text-forest mt-2"
            style={{ fontSize: "clamp(18px, 3.2vw, 44px)" }}
          >
            In many cases, no.
          </p>
        </motion.div>

        {/* Right — origin + mentors */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={headInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <p
            className="font-dm font-light text-graphite"
            style={{ fontSize: "clamp(14px, 1.8vw, 22px)", lineHeight: 1.8 }}
          >
            Miguel Ángel Jr didn&apos;t study this problem from the outside. He
            grew up inside it — watching the same pattern repeat in the same
            kind of men, for years, before he understood what was actually
            driving it. That story is in the video.
          </p>
          <p
            className="font-dm font-normal text-forest uppercase tracking-[.2em] mt-5"
            style={{ fontSize: 18 }}
          >
            Informed by: Huberman · Attia · Starrett · Nutrigermo
          </p>
        </motion.div>
      </div>

      {/* Pull text — gives stats emotional context */}
      <p
        className="font-dm font-light text-graphite mb-8"
        style={{ fontSize: "clamp(13px, 1.5vw, 18px)", lineHeight: 1.7, letterSpacing: "0.01em" }}
      >
        Most describe the result first as feeling like themselves again.
        Not a fitness change. An energy that stopped requiring caffeine to maintain.
      </p>

      {/* Stats strip */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 border-t border-forest/20"
      >
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} triggered={statsInView} index={i} />
        ))}
      </div>
    </section>
  );
}
