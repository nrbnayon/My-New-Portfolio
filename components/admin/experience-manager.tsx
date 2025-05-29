"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, Briefcase, GraduationCap } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Experience = {
  _id?: string
  title: string
  company: string
  period: string
  type: "work" | "education"
  responsibilities: string[]
  current: boolean
}

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const emptyExperience: Experience = {
    title: "",
    company: "",
    period: "",
    type: "work",
    responsibilities: [],
    current: false,
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

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

  const handleSave = async (experience: Experience) => {
    try {
      const method = experience._id ? "PUT" : "POST"
      const url = experience._id ? `/api/experience/${experience._id}` : "/api/experience"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Experience ${experience._id ? "updated" : "created"} successfully`,
        })
        fetchExperiences()
        setIsDialogOpen(false)
        setEditingExperience(null)
      } else {
        throw new Error("Failed to save experience")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save experience",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return

    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Experience deleted successfully",
        })
        fetchExperiences()
      } else {
        throw new Error("Failed to delete experience")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      })
    }
  }

  const ExperienceForm = ({
    experience,
    onSave,
  }: { experience: Experience; onSave: (experience: Experience) => void }) => {
    const [formData, setFormData] = useState(experience)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSave(formData)
    }

    const handleResponsibilitiesChange = (value: string) => {
      const responsibilities = value.split("\n").filter(Boolean)
      setFormData({ ...formData, responsibilities })
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
          <Label htmlFor="company">Company/Institution</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="period">Period</Label>
          <Input
            id="period"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            placeholder="January 2023 - Present"
            required
          />
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: "work" | "education") => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work Experience</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
          <Textarea
            id="responsibilities"
            value={formData.responsibilities.join("\n")}
            onChange={(e) => handleResponsibilitiesChange(e.target.value)}
            rows={6}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="current"
            checked={formData.current}
            onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
          />
          <Label htmlFor="current">Currently working/studying here</Label>
        </div>

        <DialogFooter>
          <Button type="submit">Save Experience</Button>
        </DialogFooter>
      </form>
    )
  }

  if (isLoading) {
    return <div>Loading experiences...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Experience Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingExperience(emptyExperience)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience?._id ? "Edit Experience" : "Add New Experience"}</DialogTitle>
              <DialogDescription>
                {editingExperience?._id ? "Update experience information" : "Create a new experience entry"}
              </DialogDescription>
            </DialogHeader>
            {editingExperience && <ExperienceForm experience={editingExperience} onSave={handleSave} />}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience._id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                {experience.type === "work" ? (
                  <Briefcase className="h-6 w-6 text-primary" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{experience.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-muted-foreground">{experience.company}</p>
                  <Badge variant="outline">{experience.period}</Badge>
                  {experience.current && <Badge variant="default">Current</Badge>}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingExperience(experience)
                    setIsDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => experience._id && handleDelete(experience._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 list-disc pl-5">
                {experience.responsibilities.map((resp, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {resp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {experiences.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No experiences found. Add your first experience to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
