"use client";

import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      style={{ mixBlendMode: "difference" }}
      className="fixed top-0 left-0 right-0 z-[400] px-6 md:px-13 py-5 flex items-center justify-between"
    >
      <span
        className="font-bebas text-eggshell tracking-[.28em]"
        style={{ fontSize: 34 }}
      >
        LID ACADEMY
      </span>
      <span
        className="font-dm font-normal text-eggshell/45 uppercase tracking-[.2em] hidden sm:block"
        style={{ fontSize: 18 }}
      >
        Miguel Ángel Jr · Health &amp; Performance Coach
      </span>
    </motion.nav>
  );
}
