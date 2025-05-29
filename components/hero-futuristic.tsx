"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Heart, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { CodingAvatar } from "@/components/ui/coding-avatar";
import { useRef } from "react";

export default function HeroFuturistic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className='relative min-h-screen flex items-center justify-center overflow-hidden py-8 lg:py-16'
    >
      {/* Dynamic gradient background */}
      <motion.div
        className='absolute inset-0 z-0'
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 60% 20%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 60%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className='container mx-auto px-4 z-10 relative'
      >
        <div className='text-center max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 mb-3 lg:mb-6'
          >
            <Sparkles className='w-3 h-3 lg:w-4 lg:h-4 text-yellow-400' />
            <span className='text-xs lg:text-sm font-medium text-white/90'>
              Available for new opportunities
            </span>
            <div className='w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-pulse' />
          </motion.div>

          {/* Passion tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='mb-3 lg:mb-6'
          >
            <div className='inline-flex items-center gap-2 lg:gap-3 px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-pink-500/20 via-red-500/20 to-orange-500/20 backdrop-blur-sm border border-white/20'>
              <Heart className='w-4 h-4 lg:w-5 lg:h-5 text-pink-400 animate-pulse' />
              <span className='text-xs lg:text-md font-medium bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent'>
                I don't just write code — I craft intelligent digital
                experiences
              </span>
              <Sparkles className='w-4 h-4 lg:w-5 lg:h-5 text-orange-400' />
            </div>
          </motion.div>

          {/* Main heading with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='mb-3 lg:mb-6'
          >
            <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>
              <span className='text-white'>Hi, I'm </span>
              <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                Nayon
              </span>
            </h1>
          </motion.div>

          {/* Enhanced typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white/90 mb-4 lg:mb-8 h-[60px] lg:h-[80px] flex items-center justify-center'
          >
            <div className='flex items-center gap-2 lg:gap-4'>
              <div className='h-10 w-10 lg:h-14 lg:w-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center'>
                <motion.div
                  className='text-lg lg:text-2xl'
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  👨‍💻
                </motion.div>
              </div>
              <Code2 className='w-6 h-6 lg:w-8 lg:h-8 text-blue-400 animate-pulse' />
              <TypeAnimation
                sequence={[
                  "Software Engineer",
                  2000,
                  "Full Stack Developer",
                  2000,
                  "AI Integration Specialist",
                  2000,
                  "MERN Stack Expert",
                  2000,
                  "Digital Experience Architect",
                  2000,
                  "Code Craftsman",
                  2000,
                ]}
                wrapper='span'
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className='bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent'
              />
            </div>
          </motion.div>

          {/* Philosophy section - Made more compact on smaller screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className='max-w-4xl mx-auto mb-6 lg:mb-12'
          >
            <div className='bg-black/40 backdrop-blur-md border border-white/20 rounded-xl lg:rounded-2xl py-4 px-6'>
              <h3 className='text-lg lg:text-2xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent'>
                My Philosophy
              </h3>
              <p className='text-sm lg:text-lg text-white/80 leading-relaxed'>
                Every line of code I write is a brushstroke on the canvas of the
                digital future. I believe in creating not just applications, but
                experiences that resonate with human emotion while pushing the
                boundaries of what's possible with AI and modern web
                technologies.
              </p>
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className='flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-8 lg:mb-16'
          >
            <Button
              asChild
              size='lg'
              className='group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 px-6 py-4 text-lg font-bold rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50'
            >
              <Link href='/#projects'>
                <motion.span
                  className='relative z-10 flex items-center gap-2 lg:gap-3'
                  whileHover={{ x: 5 }}
                >
                  <Sparkles className='w-5 h-5 lg:w-6 lg:h-6' />
                  <span className='hidden sm:inline'>
                    Explore My Digital Universe
                  </span>
                  <span className='sm:hidden'>View Projects</span>
                  <ArrowRight className='w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform' />
                </motion.span>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                  animate={{
                    background: [
                      "linear-gradient(45deg, #8b5cf6, #ec4899)",
                      "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      "linear-gradient(45deg, #ec4899, #3b82f6)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </Link>
            </Button>

            <Button
              asChild
              variant='outline'
              size='lg'
              className='group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-6 py-4 text-lg font-bold rounded-full transition-all duration-500 hover:scale-110 hover:shadow-xl'
            >
              <Link href='/resume.pdf' target='_blank'>
                <Download className='w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 group-hover:animate-bounce' />
                <span className='hidden sm:inline'>Download Resume</span>
                <span className='sm:hidden'>Resume</span>
              </Link>
            </Button>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className='flex justify-center space-x-4 lg:space-x-8'
          >
            {[
              {
                href: "https://github.com/nrbnayon",
                icon: "🚀",
                label: "GitHub",
                color: "from-gray-600 to-gray-800",
              },
              {
                href: "https://www.linkedin.com/in/itsnayon",
                icon: "💼",
                label: "LinkedIn",
                color: "from-blue-600 to-blue-800",
              },
              {
                href: "mailto:nrbnayon@gmail.com",
                icon: "💌",
                label: "Email",
                color: "from-red-500 to-pink-600",
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className={`group relative w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-2xl lg:text-3xl transition-all duration-500 hover:scale-125 hover:rotate-12 overflow-hidden`}
                whileHover={{ scale: 1.25, rotate: 12 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 1.6 + index * 0.1,
                  duration: 0.8,
                  type: "spring",
                }}
              >
                <span className='relative z-10 group-hover:scale-110 transition-transform duration-300'>
                  {social.icon}
                </span>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl' />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator - Hidden on small screens to save space */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className='absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block'
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className='flex flex-col items-center gap-2'
        >
          <span className='text-white/60 text-sm font-medium'>
            Scroll to explore
          </span>
          <div className='w-8 h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden'>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className='w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2'
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
