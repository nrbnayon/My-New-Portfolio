"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function CodingAvatar() {
  const [currentCode, setCurrentCode] = useState(0)

  const codeSnippets = [
    "const magic = () => {",
    "  return dreams.map(",
    "    idea => code(idea)",
    "  )",
    "}",
    "",
    "// Building the future...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeSnippets.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* Avatar container */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 overflow-hidden"
        animate={{
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 30px rgba(147, 51, 234, 0.4)",
            "0 0 20px rgba(59, 130, 246, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Avatar face */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
          <motion.div
            className="text-2xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            👨‍💻
          </motion.div>
        </div>

        {/* Typing indicator */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Code bubble */}
      <motion.div
        className="absolute -top-16 -right-8 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-3 min-w-[200px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="font-mono text-xs text-green-400">
          {codeSnippets.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index <= currentCode ? 1 : 0.3,
                color: index === currentCode ? "#10b981" : "#6b7280",
              }}
              transition={{ duration: 0.3 }}
            >
              {line || "\u00A0"}
            </motion.div>
          ))}
        </div>

        {/* Cursor */}
        <motion.div
          className="inline-block w-2 h-4 bg-green-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-8 transform translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-500/30" />
        </div>
      </motion.div>
    </div>
  )
}
