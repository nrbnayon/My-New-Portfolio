"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"

type Experience = {
  _id: string
  title: string
  company: string
  period: string
  type: "work" | "education"
  responsibilities: string[]
  current: boolean
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experience")
        if (response.ok) {
          const data = await response.json()
          setExperiences(data)
        }
      } catch (error) {
        console.error("Error fetching experiences:", error)
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
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (isLoading) {
    return (
      <section id="experience" className="section-container bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center">Experience & Education</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-muted p-3 rounded-full w-12 h-12"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="section-container bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading text-center"
        >
          Experience & Education
        </motion.h2>

        {experiences.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {experiences.map((exp) => (
              <motion.div key={exp._id} variants={item}>
                <Card className="card-hover">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {exp.type === "work" ? (
                        <Briefcase className="h-6 w-6 text-primary" />
                      ) : (
                        <GraduationCap className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-muted-foreground">{exp.company}</p>
                        <Badge variant="outline">{exp.period}</Badge>
                        {exp.current && <Badge variant="default">Current</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className="text-muted-foreground">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No experiences found. Add your experience in the admin panel!</p>
          </div>
        )}
      </div>
    </section>
  )
}
