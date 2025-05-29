"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { TechOrb } from "@/components/ui/tech-orb"
import { useRef } from "react"

export default function SkillsModern() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const skillCategories = [
    {
      title: "Frontend",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "TypeScript", icon: "🔷" },
        { name: "Tailwind", icon: "🎨" },
        { name: "Framer Motion", icon: "🎭" },
      ],
    },
    {
      title: "Backend",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: "🟢" },
        { name: "Express", icon: "🚀" },
        { name: "MongoDB", icon: "🍃" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "GraphQL", icon: "📊" },
      ],
    },
    {
      title: "AI & Tools",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "OpenAI", icon: "🤖" },
        { name: "TensorFlow", icon: "🧠" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" },
        { name: "Git", icon: "📝" },
      ],
    },
  ]

  return (
    <section ref={ref} id="skills" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Mastering cutting-edge technologies to build the future of web development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8 h-full">
                <div className="text-center mb-8">
                  <div className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                    <div className="w-8 h-8 bg-white/20 rounded-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <div className={`h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${category.color}`} />
                </div>

                <div className="grid grid-cols-3 gap-6 justify-items-center">
                  {category.skills.map((skill, skillIndex) => (
                    <TechOrb
                      key={skill.name}
                      icon={<span className="text-2xl">{skill.icon}</span>}
                      name={skill.name}
                      delay={categoryIndex * 0.2 + skillIndex * 0.1}
                    />
                  ))}
                </div>

                {/* Animated progress bars */}
                <div className="mt-8 space-y-3">
                  {category.skills.slice(0, 3).map((skill, index) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-white/60">{90 - index * 5}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${90 - index * 5}%` }}
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Floating skill badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            "JavaScript",
            "Python",
            "React Native",
            "Vue.js",
            "Svelte",
            "Firebase",
            "Supabase",
            "Vercel",
            "Netlify",
            "Figma",
            "Adobe XD",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-medium hover:bg-white/20 transition-all duration-300"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
