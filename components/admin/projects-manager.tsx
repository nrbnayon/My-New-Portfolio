"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Project = {
  _id?: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveLink: string
  clientRepo: string
  serverRepo: string
  featured: boolean
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const emptyProject: Project = {
    title: "",
    description: "",
    image: "",
    technologies: [],
    liveLink: "",
    clientRepo: "",
    serverRepo: "",
    featured: false,
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (project: Project) => {
    try {
      const method = project._id ? "PUT" : "POST"
      const url = project._id ? `/api/projects/${project._id}` : "/api/projects"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Project ${project._id ? "updated" : "created"} successfully`,
        })
        fetchProjects()
        setIsDialogOpen(false)
        setEditingProject(null)
      } else {
        throw new Error("Failed to save project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
        fetchProjects()
      } else {
        throw new Error("Failed to delete project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  const ProjectForm = ({ project, onSave }: { project: Project; onSave: (project: Project) => void }) => {
    const [formData, setFormData] = useState(project)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave(formData)
    }

    const handleTechnologiesChange = (value: string) => {
      const technologies = value
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
      setFormData({ ...formData, technologies })
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="technologies">Technologies (comma-separated)</Label>
          <Input
            id="technologies"
            value={formData.technologies.join(", ")}
            onChange={(e) => handleTechnologiesChange(e.target.value)}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div>
          <Label htmlFor="liveLink">Live Link</Label>
          <Input
            id="liveLink"
            value={formData.liveLink}
            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <Label htmlFor="clientRepo">Client Repository</Label>
          <Input
            id="clientRepo"
            value={formData.clientRepo}
            onChange={(e) => setFormData({ ...formData, clientRepo: e.target.value })}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <Label htmlFor="serverRepo">Server Repository</Label>
          <Input
            id="serverRepo"
            value={formData.serverRepo}
            onChange={(e) => setFormData({ ...formData, serverRepo: e.target.value })}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>

        <DialogFooter>
          <Button type="submit">Save Project</Button>
        </DialogFooter>
      </form>
    )
  }

  if (isLoading) {
    return <div>Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(emptyProject)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject?._id ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>
                {editingProject?._id ? "Update project information" : "Create a new project entry"}
              </DialogDescription>
            </DialogHeader>
            {editingProject && <ProjectForm project={editingProject} onSave={handleSave} />}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingProject(project)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => project._id && handleDelete(project._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                {project.liveLink && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Live
                    </a>
                  </Button>
                )}
                {project.clientRepo && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.clientRepo} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      Client
                    </a>
                  </Button>
                )}
              </div>
              {project.featured && (
                <Badge className="mt-2" variant="default">
                  Featured
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No projects found. Add your first project to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
