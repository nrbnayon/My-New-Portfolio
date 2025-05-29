import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/30 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold gradient-text">
              NK
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Full Stack Developer & Software Engineer</p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href="https://github.com/nrbnayon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/itsnayon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="mailto:nrbnayon@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">© {currentYear} Nayon Kanti Halder. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
