// components/ui/coding-avatar.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CodingAvatarProps {
  isActive?: boolean;
}

export function CodingAvatar({ isActive = false }: CodingAvatarProps) {
  const [currentCode, setCurrentCode] = useState(0);

  const codeSnippets = [
    "const magic = () => {",
    "  return dreams.map(",
    "    idea => code(idea)",
    "  )",
    "}",
    "",
    "// Building the future...",
  ];

  const activeSnippets = [
    "console.log('Running...')",
    "await processData()",
    "✨ Success!",
    "return result",
  ];

  const snippetsToUse = isActive ? activeSnippets : codeSnippets;

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentCode((prev) => (prev + 1) % snippetsToUse.length);
      },
      isActive ? 800 : 1200
    );

    return () => clearInterval(interval);
  }, [isActive, snippetsToUse.length]);

  return (
    <div className="relative w-24 h-24">
      {/* Avatar container */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 overflow-hidden"
        animate={{
          boxShadow: isActive
            ? [
                "0 0 20px rgba(34, 197, 94, 0.4)",
                "0 0 30px rgba(34, 197, 94, 0.6)",
                "0 0 20px rgba(34, 197, 94, 0.4)",
              ]
            : [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 30px rgba(147, 51, 234, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
          scale: isActive ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: isActive ? 2 : 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {/* Avatar face */}
        <div
          className={`absolute inset-3 rounded-full bg-gradient-to-br ${
            isActive
              ? "from-green-400 to-emerald-600"
              : "from-blue-400 to-purple-600"
          } flex items-center justify-center`}
        >
          <motion.div
            className="text-xl select-none"
            animate={{
              scale: isActive ? [1, 1.15, 1] : [1, 1.1, 1],
              rotate: isActive ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: isActive ? 1 : 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            👨‍💻
          </motion.div>
        </div>

        {/* Status indicator */}
        <motion.div
          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
            isActive ? "bg-green-500" : "bg-blue-500"
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: isActive ? 0.8 : 1.2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>

        {/* Particle effect when active */}
        {isActive && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 0,
                }}
                animate={{
                  x: [
                    "50%",
                    `${50 + (Math.random() - 0.5) * 200}%`,
                    `${50 + (Math.random() - 0.5) * 300}%`,
                  ],
                  y: [
                    "50%",
                    `${50 + (Math.random() - 0.5) * 200}%`,
                    `${50 + (Math.random() - 0.5) * 300}%`,
                  ],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Code bubble */}
      <motion.div
        className={`absolute -top-12 -right-6 bg-black/90 backdrop-blur-sm border rounded-lg p-2 min-w-[160px] ${
          isActive
            ? "border-green-500/40 shadow-lg shadow-green-500/20"
            : "border-blue-500/30 shadow-lg shadow-blue-500/20"
        }`}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
      >
        <div className="font-mono text-xs">
          {snippetsToUse.map((line, index) => (
            <motion.div
              key={`${isActive}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: index <= currentCode ? 1 : 0.4,
                color:
                  index === currentCode
                    ? isActive
                      ? "#10b981"
                      : "#3b82f6"
                    : "#6b7280",
                x: index === currentCode ? 0 : -5,
              }}
              transition={{ duration: 0.3 }}
              className="leading-tight"
            >
              {line || "\u00A0"}
            </motion.div>
          ))}
        </div>

        {/* Animated cursor */}
        <motion.div
          className={`inline-block w-1 h-3 ml-1 ${
            isActive ? "bg-green-400" : "bg-blue-400"
          }`}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Speech bubble tail */}
        <div className="absolute bottom-0 left-6 transform translate-y-full">
          <div
            className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${
              isActive ? "border-t-green-500/40" : "border-t-blue-500/30"
            }`}
          />
        </div>
      </motion.div>

      {/* Ambient glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
          isActive ? "bg-green-500/30 animate-pulse" : "bg-blue-500/20"
        }`}
        style={{ transform: "scale(1.5)" }}
      />
    </div>
  );
}
