"use client"

import { motion } from "framer-motion"
import { Code, Brain, Zap, Cpu, Database, Globe } from "lucide-react"

export function FloatingTechIcons() {
  const icons = [
    { Icon: Code, delay: 0, x: "10%", y: "20%" },
    { Icon: Brain, delay: 0.5, x: "80%", y: "15%" },
    { Icon: Zap, delay: 1, x: "15%", y: "70%" },
    { Icon: Cpu, delay: 1.5, x: "85%", y: "75%" },
    { Icon: Database, delay: 2, x: "50%", y: "10%" },
    { Icon: Globe, delay: 2.5, x: "70%", y: "50%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360],
            y: [-20, 20, -20],
          }}
          transition={{
            delay,
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
