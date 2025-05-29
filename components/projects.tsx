"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Project = {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveLink: string
  clientRepo: string
  serverRepo: string
  featured: boolean
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          // Show only featured projects on homepage, limit to 2
          const featuredProjects = data.filter((project: Project) => project.featured).slice(0, 2)
          setProjects(featuredProjects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
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
      <section id="projects" className="section-container">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 md:h-64 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-container">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading text-center"
        >
          Featured Projects
        </motion.h2>

        {projects.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <motion.div key={project._id} variants={item}>
                <Card className="overflow-hidden card-hover h-full flex flex-col">
                  <div className="relative h-48 md:h-64 w-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-3">
                    <Button asChild size="sm" variant="default">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={project.clientRepo} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" /> Client
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={project.serverRepo} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" /> Server
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No featured projects found. Add some projects in the admin panel!</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              View All Projects <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
