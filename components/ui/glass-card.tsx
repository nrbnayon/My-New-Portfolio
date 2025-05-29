import type React from "react"

import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: "light" | "medium" | "strong"
}

export function GlassCard({ children, className, intensity = "medium", ...props }: GlassCardProps) {
  const intensityClasses = {
    light: "bg-white/5 backdrop-blur-sm border-white/10",
    medium: "bg-white/10 backdrop-blur-md border-white/20",
    strong: "bg-white/20 backdrop-blur-lg border-white/30",
  }

  return (
    <div
      className={cn(
        "rounded-2xl border shadow-2xl transition-all duration-300",
        "hover:bg-white/15 hover:shadow-3xl hover:scale-[1.02]",
        intensityClasses[intensity],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
