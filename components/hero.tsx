"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  return (
    <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-block p-2 bg-secondary rounded-full"
        >
          <div className="px-3 py-1 bg-primary/10 rounded-full">
            <p className="text-sm font-medium text-primary">Available for new opportunities</p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Hi, I'm <span className="gradient-text">Nayon Kanti Halder</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl font-medium text-muted-foreground mb-8 h-[40px]"
        >
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              1000,
              "MERN Stack Specialist",
              1000,
              "Software Engineer",
              1000,
              "UI/UX Enthusiast",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <Button asChild size="lg">
            <Link href="/#projects">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/#contact">Contact Me</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center space-x-4"
        >
          <Link
            href="https://github.com/nrbnayon"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/80 p-3 rounded-full transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/itsnayon"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary hover:bg-secondary/80 p-3 rounded-full transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:nrbnayon@gmail.com"
            className="bg-secondary hover:bg-secondary/80 p-3 rounded-full transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
