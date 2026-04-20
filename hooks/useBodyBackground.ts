"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

/**
 * Attaches a ref to a section element and updates document.body.style.backgroundColor
 * whenever the section occupies the middle 10% of the viewport.
 */
export function useBodyBackground<T extends HTMLElement>(color: string) {
  const ref = useRef<T>(null);
  // Trigger when element centre crosses the middle band of the viewport
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      document.body.style.backgroundColor = color;
    }
  }, [isInView, color]);

  return ref;
}
