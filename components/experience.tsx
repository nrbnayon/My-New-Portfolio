"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Calendar } from "lucide-react"
import { useEffect, useState, useRef } from "react"

type Experience = {
  _id: string
  title: string
  company: string
  period: string
  type: "work" | "education"
  responsibilities: string[]
  current: boolean
  year: string
}

// Enhanced GlowCard component with refined border-only glow effect
const GlowCard = ({ children, identifier }: { children: React.ReactNode; identifier: string }) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(`.glow-container-${identifier}`)
    const CARDS = document.querySelectorAll(`.glow-card-${identifier}`)

    if (!CONTAINER || CARDS.length === 0) return

    const CONFIG = {
      proximity: 50,
      spread: 100,
      blur: 15,
      gap: 32,
      vertical: false,
      opacity: 0,
    }

    const UPDATE = (event: MouseEvent) => {
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect()

        if (
          event?.clientX > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.clientX < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.clientY > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.clientY < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          ;(CARD as HTMLElement).style.setProperty('--active', '1')
        } else {
          ;(CARD as HTMLElement).style.setProperty('--active', CONFIG.opacity.toString())
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ]

        let ANGLE =
          (Math.atan2(event?.clientY - CARD_CENTER[1], event?.clientX - CARD_CENTER[0]) * 180) / Math.PI

        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE
        ;(CARD as HTMLElement).style.setProperty('--start', (ANGLE + 90).toString())
      }
    }

    const RESTYLE = () => {
      ;(CONTAINER as HTMLElement).style.setProperty('--gap', CONFIG.gap.toString())
      ;(CONTAINER as HTMLElement).style.setProperty('--blur', CONFIG.blur.toString())
      ;(CONTAINER as HTMLElement).style.setProperty('--spread', CONFIG.spread.toString())
      ;(CONTAINER as HTMLElement).style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row')
    }

    RESTYLE()
    document.body.addEventListener('pointermove', UPDATE)

    return () => {
      document.body.removeEventListener('pointermove', UPDATE)
    }
  }, [identifier])

  return (
    <div className={`glow-container-${identifier} glow-container relative group`}>
      <style jsx>{`
        .glow-container {
          --gap: 32;
          --blur: 15;
          --spread: 100;
          --direction: row;
        }
        
        .glow-card {
          --active: 0;
          --start: 0;
        }
        
        .glow-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(
            from calc(var(--start) * 1deg), 
            transparent, 
            hsl(var(--primary)) calc(var(--active) * 100%), 
            transparent
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          opacity: var(--active);
          transition: opacity 0.3s ease;
        }
        
        .glow-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
      <article 
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-border/40 transition-all duration-500 ease-out relative bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-lg text-card-foreground rounded-2xl hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 w-full group-hover:scale-[1.02]`}
      >
        {children}
      </article>
    </div>
  )
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experience")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setExperiences(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching experiences:", error)
        setError("Failed to load experiences")
      } finally {
        setIsLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  if (isLoading) {
    return (
      <section id="experience" className="py-24 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <div className="relative max-w-7xl mx-auto">
            <div className="space-y-16">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i} 
                  className="grid lg:grid-cols-12 gap-8 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="lg:col-span-5 animate-pulse">
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="bg-primary/20 p-4 rounded-2xl w-16 h-16 animate-pulse" />
                        <div className="flex-1 space-y-3">
                          <div className="h-7 bg-muted/60 rounded-lg w-3/4 animate-pulse" />
                          <div className="h-5 bg-muted/40 rounded-lg w-1/2 animate-pulse" />
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="experience" className="py-24 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
              <p className="text-destructive text-lg mb-6 font-medium">{error}</p>
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight"
        >
          Experience & Education
        </motion.h2>

        {experiences.length > 0 ? (
          <div className="relative max-w-7xl mx-auto">
            {/* Enhanced Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent hidden lg:block top-0 bottom-0">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 blur-sm" />
            </div>

            <motion.div
              ref={timelineRef}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-20"
            >
              {experiences.map((exp, index) => {
                const isLeft = index % 2 === 0
                return (
                  <TimelineItem 
                    key={exp._id} 
                    exp={exp} 
                    index={index} 
                    isLeft={isLeft} 
                    variants={itemVariants} 
                  />
                )
              })}
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-2xl p-12 max-w-lg mx-auto backdrop-blur-sm">
              <p className="text-muted-foreground text-lg font-medium">
                No experiences found. Add your experience in the admin panel!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function TimelineItem({
  exp,
  index,
  isLeft,
  variants,
}: {
  exp: Experience
  index: number
  isLeft: boolean
  variants: any
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-15%",
    amount: 0.4
  })

  return (
    <motion.div 
      ref={ref} 
      variants={variants} 
      className="grid lg:grid-cols-12 gap-10 items-start relative"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:contents">
        {/* Left side - Card or Year marker */}
        <div className="lg:col-span-5 pr-8">
          {isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: 15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -60, rotateY: 15 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
            >
              <GlowCard identifier={`timeline-${exp._id}-${index}`}>
                <TimelineCard exp={exp} isLeft={true} />
              </GlowCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-end text-right space-y-3 pt-12"
            >
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-6 py-3 rounded-full border border-primary/30 backdrop-blur-sm shadow-lg">
                <span className="text-sm font-semibold text-primary">{exp.year}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{exp.period}</p>
            </motion.div>
          )}
        </div>

        {/* Timeline Center - Enhanced pointer */}
        <div className="lg:col-span-2 flex justify-center relative">
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
            animate={isInView ? { scale: 1, opacity: 1, rotateZ: 0 } : { scale: 0.8, opacity: 0.6, rotateZ: -90 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative z-10 mt-12"
          >
            {/* Timeline pointer - enhanced design */}
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full border-4 border-background shadow-2xl flex items-center justify-center relative group">
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.3,
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="flex items-center justify-center relative z-10"
              >
                {exp.type === "work" ? (
                  <Briefcase className="h-6 w-6 text-primary-foreground drop-shadow-sm" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-primary-foreground drop-shadow-sm" />
                )}
              </motion.div>
              
              {/* Enhanced pulse rings */}
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={isInView ? { 
                  scale: [1, 1.8, 1], 
                  opacity: [0.8, 0, 0.8] 
                } : { scale: 1, opacity: 0 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-primary rounded-full -z-10"
              />
              
              <motion.div
                initial={{ scale: 1, opacity: 0.6 }}
                animate={isInView ? { 
                  scale: [1, 2.2, 1], 
                  opacity: [0.6, 0, 0.6] 
                } : { scale: 1, opacity: 0 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute inset-0 bg-primary/60 rounded-full -z-20"
              />
            </div>
            
            {/* Enhanced year marker */}
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-md border border-border/60 rounded-xl px-4 py-2 shadow-xl"
            >
              <span className="text-xs font-semibold whitespace-nowrap bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {exp.year}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Card or Year marker */}
        <div className="lg:col-span-5 pl-8">
          {!isLeft ? (
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 60, rotateY: -15 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full"
            >
              <GlowCard identifier={`timeline-${exp._id}-${index}`}>
                <TimelineCard exp={exp} isLeft={false} />
              </GlowCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col items-start space-y-3 pt-12"
            >
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-6 py-3 rounded-full border border-primary/30 backdrop-blur-sm shadow-lg">
                <span className="text-sm font-semibold text-primary">{exp.year}</span>
              </div>
              <p className="text-xs text-muted-foreground font-medium">{exp.period}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enhanced Mobile Layout */}
      <div className="lg:hidden col-span-12 relative pl-20">
        {/* Enhanced mobile timeline line */}
        <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/70 to-primary/40">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 blur-sm" />
        </div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0, rotateZ: -180 }}
          animate={isInView ? { scale: 1, opacity: 1, rotateZ: 0 } : { scale: 0.8, opacity: 0.5, rotateZ: -90 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute left-7 top-10 transform -translate-x-1/2 z-10"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full border-4 border-background shadow-2xl flex items-center justify-center relative">
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.3,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex items-center justify-center"
            >
              {exp.type === "work" ? (
                <Briefcase className="h-5 w-5 text-primary-foreground drop-shadow-sm" />
              ) : (
                <GraduationCap className="h-5 w-5 text-primary-foreground drop-shadow-sm" />
              )}
            </motion.div>
            
            {/* Mobile pulse rings */}
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={isInView ? { 
                scale: [1, 1.6, 1], 
                opacity: [0.6, 0, 0.6] 
              } : { scale: 1, opacity: 0 }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-primary rounded-full -z-10"
            />
          </div>
          
          {/* Mobile year marker */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-md border border-border/60 rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-xs font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {exp.year}
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6"
        >
          <GlowCard identifier={`timeline-mobile-${exp._id}-${index}`}>
            <TimelineCard exp={exp} isLeft={true} />
          </GlowCard>
        </motion.div>
      </div>
    </motion.div>
  )
}

function TimelineCard({ exp, isLeft = true }: { exp: Experience; isLeft?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-25%" })

  return (
    <Card className="border-0 bg-transparent shadow-none overflow-hidden" ref={ref}>
      <CardHeader className="flex flex-row items-start gap-5 pb-6">
        <motion.div
          whileHover={{ 
            rotate: 360, 
            scale: 1.15,
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="bg-gradient-to-br from-primary/25 via-primary/15 to-primary/5 p-4 rounded-2xl border border-primary/25 flex-shrink-0 shadow-lg backdrop-blur-sm group"
        >
          {exp.type === "work" ? (
            <Briefcase className="h-7 w-7 text-primary drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <GraduationCap className="h-7 w-7 text-primary drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          )}
        </motion.div>
        <div className="flex-1 min-w-0">
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl font-bold text-foreground mb-3 leading-tight text-left bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
          >
            {exp.title}
          </motion.h3>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 mb-4 justify-start"
          >
            <p className="text-muted-foreground font-semibold text-left text-lg">{exp.company}</p>
            <Badge variant="outline" className="text-xs font-medium bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
              <Calendar className="h-3 w-3 mr-1.5" />
              {exp.period}
            </Badge>
            {exp.current && (
              <Badge className="text-xs bg-gradient-to-r from-emerald-500 to-emerald-600 font-medium shadow-lg animate-pulse">
                Current
              </Badge>
            )}
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-6 pb-6">
        <ul className="space-y-4">
          {exp.responsibilities.map((resp, respIndex) => (
            <motion.li
              key={respIndex}
              initial={{ opacity: 0, x: -15, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -15, scale: 0.95 }}
              transition={{ 
                delay: respIndex * 0.1 + 0.3,
                duration: 0.5,
                ease: "easeOut"
              }}
              className="text-muted-foreground leading-relaxed flex items-start gap-4 text-left group"
            >
              <motion.div 
                initial={{ scale: 0, backgroundColor: "hsl(var(--primary))" }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  delay: respIndex * 0.1 + 0.4,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                className="w-2 h-2 bg-gradient-to-br from-primary to-primary/80 rounded-full mt-2.5 flex-shrink-0 shadow-sm group-hover:scale-125 transition-transform duration-300" 
              />
              <span className="text-sm leading-relaxed text-left font-medium group-hover:text-foreground/90 transition-colors duration-300">
                {resp}
              </span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}