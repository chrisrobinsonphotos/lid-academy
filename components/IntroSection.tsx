"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Manual scroll-driven progress — avoids Framer Motion v12 ViewTimeline
  // acceleration which doesn't update opacity via JS path
  const progress = useMotionValue(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const containerTop = el.offsetTop;
      const containerHeight = el.offsetHeight;
      const raw = (window.scrollY - containerTop) / containerHeight;
      progress.set(Math.max(0, Math.min(1, raw)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  // ── LEAD ──────────────────────────────────────────────────────────────────
  const leadOpacity = useTransform(progress, [0, 0.28, 0.40], [1, 1, 0]);
  const leadScale   = useTransform(progress, [0.28, 0.40],    [1, 1.07]);

  // ── INSPIRE ───────────────────────────────────────────────────────────────
  const inspireOpacity = useTransform(
    progress,
    [0.30, 0.42, 0.57, 0.68],
    [0,    1,    1,    0]
  );
  const inspireScale = useTransform(
    progress,
    [0.30, 0.42, 0.57, 0.68],
    [0.94, 1,    1,    1.07]
  );

  // ── DOMINATE ──────────────────────────────────────────────────────────────
  const dominateOpacity = useTransform(
    progress,
    [0.59, 0.70, 0.88, 1.0],
    [0,    1,    1,    0]
  );
  const dominateScale = useTransform(
    progress,
    [0.59, 0.70, 0.88, 1.0],
    [0.94, 1,    1,    1.07]
  );

  // ── Background crossfade to eggshell at the end ────────────────────────
  const eggshellOverlay = useTransform(progress, [0.87, 1.0], [0, 1]);

  // ── L · I · D indicator letter highlights ─────────────────────────────
  const lOpacity = useTransform(progress, [0, 0.30, 0.40], [1, 1, 0.25]);
  const iOpacity = useTransform(progress, [0.30, 0.42, 0.57, 0.70], [0.25, 1, 1, 0.25]);
  const dOpacity = useTransform(progress, [0.59, 0.70, 0.88, 1.0],  [0.25, 1, 1, 0.25]);

  // Body background — set to iron while inside intro section
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      if (v > 0.01 && v < 0.99) {
        document.body.style.backgroundColor = "#23272E";
      }
    });
    return () => unsub();
  }, [progress]);

  return (
    <div ref={containerRef} style={{ height: "380vh", position: "relative" }}>
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "#23272E",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Eggshell overlay — fades in at end to hand off to hero */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "#F8F6F1",
            opacity: eggshellOverlay,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* ── L · I · D top-left indicator ── */}
        <div
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "3.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            zIndex: 5,
          }}
        >
          {(
            [
              { char: "L", opacity: lOpacity },
              { char: "·", opacity: null },
              { char: "I", opacity: iOpacity },
              { char: "·", opacity: null },
              { char: "D", opacity: dOpacity },
            ] as const
          ).map(({ char, opacity }, idx) => (
            <motion.span
              key={idx}
              className="font-dm font-normal uppercase"
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                color:
                  opacity !== null ? undefined : "rgba(248,246,241,0.12)",
              }}
            >
              {opacity !== null ? (
                <motion.span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    color: "rgba(248,246,241,0.22)",
                  }}
                >
                  {char}
                  <motion.span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      color: "#2D6A2D",
                      opacity,
                    }}
                  >
                    {char}
                  </motion.span>
                </motion.span>
              ) : (
                char
              )}
            </motion.span>
          ))}
        </div>

        {/* ── LEAD ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: leadOpacity,
            scale: leadScale,
          }}
        >
          <motion.span
            className="font-bebas text-eggshell"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              fontSize: "clamp(64px, 25vw, 450px)",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
              display: "block",
            }}
          >
            LEAD
          </motion.span>
        </motion.div>

        {/* ── INSPIRE ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: inspireOpacity,
            scale: inspireScale,
          }}
        >
          <span
            className="font-bebas text-eggshell"
            style={{
              fontSize: "clamp(64px, 25vw, 450px)",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
            }}
          >
            INSPIRE
          </span>
        </motion.div>

        {/* ── DOMINATE ── forest green for maximum climax ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: dominateOpacity,
            scale: dominateScale,
          }}
        >
          <span
            className="font-bebas text-forest"
            style={{
              fontSize: "clamp(64px, 25vw, 450px)",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
            }}
          >
            DOMINATE
          </span>
        </motion.div>
      </div>
    </div>
  );
}
