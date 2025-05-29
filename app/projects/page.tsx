import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"

async function getProjects() {
  try {
    const client = await clientPromise
    const db = client.db("Portfolio")
    const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray()

    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">All Projects</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore my complete portfolio of web applications, showcasing various technologies and solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project._id} className="overflow-hidden card-hover h-full flex flex-col">
            <div className="relative h-48 w-full">
              <Image
                src={project.image || "/placeholder.svg?height=200&width=400"}
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
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <Badge key={techIndex} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              {project.liveLink && (
                <Button asChild size="sm" variant="default">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.clientRepo && (
                <Button asChild size="sm" variant="outline">
                  <Link href={project.clientRepo} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" /> Client
                  </Link>
                </Button>
              )}
              {project.serverRepo && (
                <Button asChild size="sm" variant="outline">
                  <Link href={project.serverRepo} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" /> Server
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No projects found. Check back soon for updates!</p>
        </div>
      )}
    </div>
  )
}
