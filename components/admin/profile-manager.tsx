"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Save, User } from "lucide-react"
import { Label } from "@/components/ui/label"

type Profile = {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  objective: string
  resumeUrl: string
  profileImage: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
  }
}

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile>({
    name: "Nayon Kanti Halder",
    email: "nrbnayon@gmail.com",
    phone: "+880 1934025581",
    location: "Vatara, Dhaka, Bangladesh",
    bio: "",
    objective: "",
    resumeUrl: "",
    profileImage: "",
    socialLinks: {
      github: "https://github.com/nrbnayon",
      linkedin: "https://www.linkedin.com/in/itsnayon",
      twitter: "",
    },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile({ ...profile, ...data })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Management</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                value={profile.profileImage}
                onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                placeholder="https://example.com/profile.jpg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="objective">Career Objective</Label>
              <Textarea
                id="objective"
                value={profile.objective}
                onChange={(e) => setProfile({ ...profile, objective: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                value={profile.resumeUrl}
                onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                placeholder="https://example.com/resume.pdf"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={profile.socialLinks.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, github: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={profile.socialLinks.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={profile.socialLinks.twitter}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: { ...profile.socialLinks, twitter: e.target.value },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
