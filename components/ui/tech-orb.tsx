"use client"

import { motion } from "framer-motion"
import type React from "react"

interface TechOrbProps {
  icon: React.ReactNode
  name: string
  delay?: number
}

export function TechOrb({ icon, name, delay = 0 }: TechOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{
        delay,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Icon */}
        <div className="relative z-10 text-white/80 group-hover:text-white transition-colors">{icon}</div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-600/40 blur-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Name tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/70 whitespace-nowrap"
      >
        {name}
      </motion.div>
    </motion.div>
  )
}
