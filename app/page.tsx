  // app\page.tsx
  import HeroFuturistic from "@/components/hero-futuristic"
  import AboutModern from "@/components/about-modern"
  import WhyICode from "@/components/why-i-code"
  import TechStack3D from "@/components/tech-stack-3d"
  import Projects from "@/components/projects"
  import Experience from "@/components/experience"
  import Contact from "@/components/contact"
  import { InteractiveCodeEditor } from "@/components/ui/interactive-code-editor"

  export default async function Home() {
    return (
      <div className="relative">
        <HeroFuturistic />
        <AboutModern />
        <WhyICode />

        {/* Interactive Code Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Code in Action
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Experience my coding style and see real examples of my work
              </p>
            </div>
            <InteractiveCodeEditor />
          </div>
        </section>

        <TechStack3D />
        <Projects />
        <Experience />
        <Contact />
      </div>
    )
  }
