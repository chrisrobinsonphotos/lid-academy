"use client";

import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

/**
 * Returns a smoothly lerped mouse position for use with the custom cursor.
 */
export function useMousePosition(): Position {
  const [position, setPosition] = useState<Position>({ x: -100, y: -100 });

  useEffect(() => {
    let animFrame: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);
      setPosition({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return position;
}
