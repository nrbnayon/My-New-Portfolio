"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Globe, Layers, Server, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Globe className="h-6 w-6 text-primary" />,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "Redux RTK",
      "Tailwind CSS",
      "Component UI",
      "JWT",
      "TanStack Query",
      "Shadcn UI",
      "Material UI",
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6 text-primary" />,
    skills: ["Node.js", "Express.js", "JWT", "JSON", "RESTful APIs"],
  },
  {
    title: "Database",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: ["MongoDB", "Aggregation Framework", "Firebase", "DBMS"],
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="h-6 w-6 text-primary" />,
    skills: [
      "Git & Github",
      "VS Code",
      "Postman",
      "Vercel",
      "Netlify",
      "Figma",
      "Canva",
      "CI/CD",
      "AWS",
      "Webflow",
      "FlutterFlow",
      "SCSS",
      "Three.js",
    ],
  },
  {
    title: "Soft Skills",
    icon: <Layers className="h-6 w-6 text-primary" />,
    skills: ["Problem Solving", "Quick Learner", "Team Work", "Hard Working", "Passionate"],
  },
  {
    title: "Currently Learning",
    icon: <Code2 className="h-6 w-6 text-primary" />,
    skills: ["AI Integration", "GraphQL", "Docker", "Kubernetes", "Web3"],
  },
]

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="section-container bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading text-center"
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {category.icon}
                    <h3 className="text-xl font-bold ml-2">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-sm py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
