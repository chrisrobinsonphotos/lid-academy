"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Cursor() {
  const { x, y } = useMousePosition();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-[600] w-2 h-2 rounded-full bg-forest pointer-events-none"
        style={{ x: x - 4, y: y - 4 }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-[599] rounded-full border border-forest/50 pointer-events-none"
        style={{ x: x - 18, y: y - 18, width: 36, height: 36 }}
        animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.4 : 0.6 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
