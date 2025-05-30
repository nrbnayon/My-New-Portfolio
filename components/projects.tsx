"use client";

import { motion } from "framer-motion";
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
import DataLoading from "./data-loading";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          // Show only featured projects on homepage, limit to 2
          const featuredProjects = data
            .filter((project: Project) => project.featured)
            .slice(0, 2);
          setProjects(featuredProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <DataLoading />;
  }

  return (
    <section id='projects' className='section-container'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='section-heading text-center'
        >
          Featured Projects
        </motion.h2>

        {projects.length > 0 ? (
          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='grid grid-cols-1 lg:grid-cols-2 gap-8'
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={item}
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Card className='overflow-hidden card-hover h-full flex flex-col'>
                  <BrowserMockup
                    project={project}
                    isHovered={hoveredProject === project._id}
                    height='h-48 md:h-64'
                    showControls={false} // Minimal controls for homepage
                    autoSlideOnHover={true}
                  />
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex-grow'>
                    <p className='text-muted-foreground mb-4'>
                      {project.description}
                    </p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant='outline'>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className='flex flex-wrap gap-3'>
                    <Button asChild size='sm' variant='default'>
                      <Link
                        href={project.liveLink}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4 mr-1' /> Live Demo
                      </Link>
                    </Button>
                    <Button asChild size='sm' variant='outline'>
                      <Link
                        href={project.clientRepo}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='h-4 w-4 mr-1' /> Client
                      </Link>
                    </Button>
                    <Button asChild size='sm' variant='outline'>
                      <Link
                        href={project.serverRepo}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='h-4 w-4 mr-1' /> Server
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-muted-foreground'>
              No featured projects found. Add some projects in the admin panel!
            </p>
          </div>
        )}

        <div className='text-center mt-10'>
          <Button asChild variant='outline' size='lg'>
            <Link href='/projects'>
              View All Projects <ExternalLink className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
