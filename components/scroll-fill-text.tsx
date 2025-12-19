"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollFillTextProps {
  content: string
  className?: string
  containerClassName?: string
}

export default function ScrollFillText({ content, className, containerClassName }: ScrollFillTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 1])
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className={cn("relative inline-block", containerClassName)}>
      {/* Base text (outline or faded) */}
      <h2 className={cn("text-gray-300 select-none", className)}>{content}</h2>

      {/* Filled text overlay */}
      <motion.div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: fillHeight }}>
        <h2 className={cn("text-[#1A3A52]", className)}>{content}</h2>
      </motion.div>
    </div>
  )
}
