"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function AnimatedText({
  text,
  delay = 0.035,
  primaryWords = 0, // Default to 0 (no highlighting)
  className = "",
  highlightColor = "var(--color-primary)", // Default to primary color
  defaultColor = "var(--color-gray-700)" // Default text color
}: {
  text: string;
  delay?: number;
  primaryWords?: number; // 0 means no highlighting
  className?: string;
  highlightColor?: string;
  defaultColor?: string;
}) {
  const words = text.split(" ");
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.9 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-wrap text-left leading-relaxed ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0.2, color: "var(--color-gray-600)" },
            visible: (index: number) => ({
              opacity: 1,
              color:
                index < primaryWords
                  ? highlightColor
                  : defaultColor,
              transition: {
                duration: 0.8,
                delay: index * delay,
                ease: "easeOut",
              },
            }),
          }}
          style={{ display: "inline-block", marginRight: "0.5rem" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}