"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataLoading from "@/components/data-loading";
import BrowserMockup from "@/components/common/BrowserMockup";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  technologies: string[];
  liveLink: string;
  clientRepo: string;
  serverRepo: string;
  featured: boolean;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch projects"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <DataLoading />;
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center py-16'>
          <p className='text-xl text-red-500 mb-4'>Error loading projects</p>
          <p className='text-muted-foreground'>{error}</p>
          <Button onClick={() => window.location.reload()} className='mt-4'>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 gradient-text'>
          All Projects
        </h1>
        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
          Explore my complete portfolio of web applications, showcasing various
          technologies and solutions.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className='text-center py-16'>
          <p className='text-xl text-muted-foreground'>
            No projects found. Check back soon for updates!
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project) => (
            <Card
              key={project._id}
              className='overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col group border-0 shadow-lg'
              onMouseEnter={() => setHoveredProject(project._id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <BrowserMockup
                project={project}
                isHovered={hoveredProject === project._id}
                height='h-48'
                showControls={true}
                autoSlideOnHover={true}
              />

              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center justify-between'>
                  <span className='text-lg font-bold'>{project.title}</span>
                  {project.featured && (
                    <Badge
                      variant='default'
                      className='ml-2 bg-gradient-to-r from-blue-500 to-purple-600'
                    >
                      ⭐ Featured
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className='flex-grow'>
                <p className='text-muted-foreground mb-4 leading-relaxed'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies?.map(
                    (tech: string, techIndex: number) => (
                      <Badge key={techIndex} variant='outline'>
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </CardContent>

              <CardFooter className='flex flex-wrap gap-3'>
                {project.liveLink && (
                  <Button asChild size='sm' variant='default'>
                    <Link
                      href={project.liveLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-4 w-4 mr-1' /> Live Demo
                    </Link>
                  </Button>
                )}
                {project.clientRepo && (
                  <Button asChild size='sm' variant='outline'>
                    <Link
                      href={project.clientRepo}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-4 w-4 mr-1' /> Client
                    </Link>
                  </Button>
                )}
                {project.serverRepo && (
                  <Button asChild size='sm' variant='outline'>
                    <Link
                      href={project.serverRepo}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-4 w-4 mr-1' /> Server
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
