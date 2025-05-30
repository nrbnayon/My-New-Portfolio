"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  X,
  ImageIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Project = {
  _id?: string;
  title: string;
  description: string;
  images: string[]; // Changed from single image to array of images
  technologies: string[];
  liveLink: string;
  clientRepo: string;
  serverRepo: string;
  featured: boolean;
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const emptyProject: Project = {
    title: "",
    description: "",
    images: [],
    technologies: [],
    liveLink: "",
    clientRepo: "",
    serverRepo: "",
    featured: false,
  };

  const toast = ({
    title,
    description,
    variant,
  }: {
    title: string;
    description: string;
    variant?: string;
  }) => {
    // Replace this with your actual toast implementation
    // For example: useToast() from your UI library
    console.log(`${title}: ${description}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (project: Project) => {
    try {
      const method = project._id ? "PUT" : "POST";
      const url = project._id
        ? `/api/projects/${project._id}`
        : "/api/projects";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Project ${project._id ? "updated" : "created"} successfully`,
        });
        fetchProjects();
        setIsDialogOpen(false);
        setEditingProject(null);
      } else {
        throw new Error("Failed to save project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        fetchProjects();
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const ImageCarousel = ({ images }: { images: string[] }) => {
    const [currentImage, setCurrentImage] = useState(0);

    if (images?.length === 0) {
      return (
        <div className='w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center'>
          <ImageIcon className='h-12 w-12 text-gray-400' />
        </div>
      );
    }

    if (images.length === 1) {
      return (
        <div className='relative w-full h-48 rounded-lg overflow-hidden'>
          <img
            src={images[0]}
            alt='Project screenshot'
            className='w-full h-full object-cover'
          />
        </div>
      );
    }

    return (
      <div className='relative w-full h-48 rounded-lg overflow-hidden'>
        <img
          src={images[currentImage]}
          alt={`Project screenshot ${currentImage + 1}`}
          className='w-full h-full object-cover transition-opacity duration-300'
        />

        {/* Navigation dots */}
        <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentImage === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors'
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors'
            >
              →
            </button>
          </>
        )}

        {/* Image counter */}
        <div className='absolute top-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded'>
          {currentImage + 1} / {images.length}
        </div>
      </div>
    );
  };

  const ProjectForm = ({
    project,
    onSave,
  }: {
    project: Project;
    onSave: (project: Project) => void;
  }) => {
    const [formData, setFormData] = useState(project);
    const [newImageUrl, setNewImageUrl] = useState("");

    const handleSubmit = () => {
      onSave(formData);
    };

    const handleTechnologiesChange = (value: string) => {
      const technologies = value
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      setFormData({ ...formData, technologies });
    };

    const addImage = () => {
      if (newImageUrl.trim()) {
        setFormData({
          ...formData,
          images: [...formData.images, newImageUrl.trim()],
        });
        setNewImageUrl("");
      }
    };

    const removeImage = (index: number) => {
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== index),
      });
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
      const newImages = [...formData.images];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      setFormData({ ...formData, images: newImages });
    };

    return (
      <div className='space-y-4'>
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label>Project Images</Label>
          <div className='space-y-2'>
            {/* Add new image */}
            <div className='flex space-x-2'>
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder='https://example.com/image.jpg'
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addImage())
                }
              />
              <Button type='button' onClick={addImage} variant='outline'>
                <Plus className='h-4 w-4' />
              </Button>
            </div>

            {/* Display existing images */}
            {formData.images.length > 0 && (
              <div className='space-y-2 max-h-48 overflow-y-auto'>
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 p-2 border rounded'
                  >
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className='w-12 h-12 object-cover rounded'
                    />
                    <span className='flex-1 text-sm truncate'>{image}</span>
                    <div className='flex space-x-1'>
                      {index > 0 && (
                        <Button
                          type='button'
                          size='sm'
                          variant='outline'
                          onClick={() => moveImage(index, index - 1)}
                        >
                          ↑
                        </Button>
                      )}
                      {index < formData.images.length - 1 && (
                        <Button
                          type='button'
                          size='sm'
                          variant='outline'
                          onClick={() => moveImage(index, index + 1)}
                        >
                          ↓
                        </Button>
                      )}
                      <Button
                        type='button'
                        size='sm'
                        variant='outline'
                        onClick={() => removeImage(index)}
                      >
                        <X className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor='technologies'>Technologies (comma-separated)</Label>
          <Input
            id='technologies'
            value={formData.technologies.join(", ")}
            onChange={(e) => handleTechnologiesChange(e.target.value)}
            placeholder='React, Node.js, MongoDB'
          />
        </div>

        <div>
          <Label htmlFor='liveLink'>Live Link</Label>
          <Input
            id='liveLink'
            value={formData.liveLink}
            onChange={(e) =>
              setFormData({ ...formData, liveLink: e.target.value })
            }
            placeholder='https://example.com'
          />
        </div>

        <div>
          <Label htmlFor='clientRepo'>Client Repository</Label>
          <Input
            id='clientRepo'
            value={formData.clientRepo}
            onChange={(e) =>
              setFormData({ ...formData, clientRepo: e.target.value })
            }
            placeholder='https://github.com/username/repo'
          />
        </div>

        <div>
          <Label htmlFor='serverRepo'>Server Repository</Label>
          <Input
            id='serverRepo'
            value={formData.serverRepo}
            onChange={(e) =>
              setFormData({ ...formData, serverRepo: e.target.value })
            }
            placeholder='https://github.com/username/repo'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            id='featured'
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
          />
          <Label htmlFor='featured'>Featured Project</Label>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save Project</Button>
        </DialogFooter>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Projects Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(emptyProject)}>
              <Plus className='h-4 w-4 mr-2' />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>
                {editingProject?._id ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                {editingProject?._id
                  ? "Update project information"
                  : "Create a new project entry"}
              </DialogDescription>
            </DialogHeader>
            {editingProject && (
              <ProjectForm project={editingProject} onSave={handleSave} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projects.map((project) => (
          <Card key={project._id} className='overflow-hidden'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <CardTitle className='text-lg'>{project.title}</CardTitle>
                <div className='flex space-x-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => {
                      setEditingProject(project);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => project._id && handleDelete(project._id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Image carousel */}
              <ImageCarousel images={project.images} />

              <p className='text-sm text-muted-foreground'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-1'>
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant='secondary' className='text-xs'>
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className='flex space-x-2'>
                {project.liveLink && (
                  <Button size='sm' variant='outline' asChild>
                    <a
                      href={project.liveLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-3 w-3 mr-1' />
                      Live
                    </a>
                  </Button>
                )}
                {project.clientRepo && (
                  <Button size='sm' variant='outline' asChild>
                    <a
                      href={project.clientRepo}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-3 w-3 mr-1' />
                      Client
                    </a>
                  </Button>
                )}
                {project.serverRepo && (
                  <Button size='sm' variant='outline' asChild>
                    <a
                      href={project.serverRepo}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-3 w-3 mr-1' />
                      Server
                    </a>
                  </Button>
                )}
              </div>

              {project.featured && <Badge variant='default'>Featured</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className='text-center py-8'>
            <p className='text-muted-foreground'>
              No projects found. Add your first project to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
