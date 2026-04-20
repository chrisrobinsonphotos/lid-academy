"use client";

import { useState, useEffect } from "react";

/**
 * Animates a number from 0 → target over `duration` ms.
 * Only starts when `triggered` becomes true.
 */
export function useCounter(
  target: number,
  duration: number,
  triggered: boolean
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, triggered]);

  return count;
}
