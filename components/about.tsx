"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="section-container">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading text-center"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/40 rounded-2xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-background rounded-2xl border transform -rotate-3"></div>
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Nayon Kanti Halder"
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Full Stack Developer & Software Engineer</h3>
            <p className="text-muted-foreground mb-4">
              I'm an enthusiastic and detail-oriented Full Stack Developer with a solid foundation in HTML5, CSS3,
              TypeScript, and JavaScript, along with experience in frameworks and libraries such as React.js, Next.js,
              Express.js, and Node.js, including AI agentic features.
            </p>
            <p className="text-muted-foreground mb-6">
              I'm eager to leverage my technical expertise to contribute to a dynamic team and drive impactful projects.
              I'm committed to overcoming challenges, enhancing user experiences, and continuously improving my coding
              and debugging skills.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-semibold">Name:</h4>
                <p className="text-muted-foreground">Nayon Kanti Halder</p>
              </div>
              <div>
                <h4 className="font-semibold">Email:</h4>
                <p className="text-muted-foreground">nrbnayon@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold">Location:</h4>
                <p className="text-muted-foreground">Vatara, Dhaka, Bangladesh</p>
              </div>
              <div>
                <h4 className="font-semibold">Phone:</h4>
                <p className="text-muted-foreground">+880 1934025581</p>
              </div>
            </div>

            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
