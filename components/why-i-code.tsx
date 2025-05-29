"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Code, Lightbulb, Rocket, Users, Globe } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { useRef } from "react"

export default function WhyICode() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const reasons = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion Drives Innovation",
      description: "Every line of code I write is fueled by genuine love for creating digital experiences that matter.",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Ideas Become Reality",
      description:
        "Code is my paintbrush, and the digital canvas is where impossible ideas transform into tangible solutions.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connecting Humanity",
      description: "Technology should bring people together, solve real problems, and make life more meaningful.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Building the Future",
      description: "Each project is a step toward a more intelligent, connected, and beautiful digital world.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Pushing Boundaries",
      description: "I don't just follow trends—I create them by exploring the intersection of AI and human creativity.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Crafting Excellence",
      description:
        "Clean, efficient, and elegant code isn't just functional—it's an art form that reflects my dedication.",
      color: "from-teal-500 to-blue-500",
    },
  ]

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <motion.div style={{ opacity }} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Why I Code
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Beyond the syntax and algorithms lies a deeper purpose—a mission to create meaningful digital experiences
          </p>
        </motion.div>

        {/* Central Philosophy */}
        <motion.div style={{ y }} className="text-center mb-20">
          <GlassCard className="max-w-4xl mx-auto p-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white animate-pulse" />
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              "Code is Poetry in Motion"
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-white/80 leading-relaxed"
            >
              I believe that programming is more than just solving problems—it's about crafting experiences that touch
              people's lives. Every function I write, every component I design, and every algorithm I optimize carries a
              piece of my soul and a vision for a better digital future.
            </motion.p>
          </GlassCard>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <GlassCard className="p-8 h-full">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.color} mb-6`}>
                  <div className="text-white">{reason.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{reason.title}</h3>
                <p className="text-white/70 leading-relaxed">{reason.description}</p>

                {/* Animated underline */}
                <motion.div
                  className={`h-1 bg-gradient-to-r ${reason.color} rounded-full mt-6`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <GlassCard className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Let's Create Something Amazing Together</h3>
            <p className="text-white/70 mb-6">
              Ready to turn your vision into reality? Let's collaborate and build the future, one line of code at a
              time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              Start Our Journey
            </motion.button>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  )
}
