"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let locomotiveScroll: any

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default

      locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: "is-revealed",
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      })

      // Update scroll on window resize
      const handleResize = () => {
        locomotiveScroll.update()
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (locomotiveScroll) locomotiveScroll.destroy()
      }
    }

    initLocomotiveScroll()

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy()
    }
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}
