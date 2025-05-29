"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TechStack3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-25, 25]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const techStacks = [
    {
      category: "Frontend",
      color: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "React", icon: "⚛️", level: 95 },
        { name: "Next.js", icon: "▲", level: 90 },
        { name: "TypeScript", icon: "🔷", level: 88 },
        { name: "Tailwind CSS", icon: "🎨", level: 92 },
        { name: "Framer Motion", icon: "🎭", level: 85 },
      ],
    },
    {
      category: "Backend",
      color: "from-green-500 to-emerald-500",
      technologies: [
        { name: "Node.js", icon: "🟢", level: 90 },
        { name: "Express.js", icon: "🚀", level: 88 },
        { name: "MongoDB", icon: "🍃", level: 85 },
        { name: "PostgreSQL", icon: "🐘", level: 80 },
        { name: "GraphQL", icon: "📊", level: 75 },
      ],
    },
    {
      category: "AI & Cloud",
      color: "from-purple-500 to-pink-500",
      technologies: [
        { name: "OpenAI API", icon: "🤖", level: 85 },
        { name: "TensorFlow", icon: "🧠", level: 70 },
        { name: "AWS", icon: "☁️", level: 80 },
        { name: "Docker", icon: "🐳", level: 75 },
        { name: "Vercel", icon: "▲", level: 90 },
      ],
    },
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % techStacks.length);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, techStacks.length]);

  const nextStack = () => {
    setCurrentIndex((prev) => (prev + 1) % techStacks.length);
  };

  const prevStack = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + techStacks.length) % techStacks.length
    );
  };

  return (
    <section className='py-32 relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
              Tech Arsenal
            </span>
          </h2>
          <p className='text-xl text-white/70 max-w-3xl mx-auto'>
            Mastering cutting-edge technologies to build the future
          </p>
        </motion.div>

        <div className='relative max-w-4xl mx-auto'>
          {/* 3D Carousel Container */}
          <div
            className='relative h-[600px] flex items-center justify-center perspective-1000'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className='relative w-full h-full'
              style={{ rotateY }}
              drag='x'
              dragConstraints={{ left: -200, right: 200 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) {
                  prevStack();
                } else if (info.offset.x < -100) {
                  nextStack();
                }
              }}
            >
              {techStacks.map((stack, index) => {
                const isActive = index === currentIndex;
                const offset = index - currentIndex;

                return (
                  <motion.div
                    key={stack.category}
                    className='absolute inset-0 flex items-center justify-center'
                    animate={{
                      rotateY: offset * 60,
                      z: isActive ? 0 : -200,
                      opacity: Math.abs(offset) <= 1 ? 1 : 0,
                      scale: isActive ? 1 : 0.8,
                    }}
                    transition={{
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: isActive ? 10 : Math.abs(offset) <= 1 ? 5 : 1,
                    }}
                  >
                    <div
                      className={`w-96 h-[500px] bg-gradient-to-br ${stack.color} p-1 rounded-3xl shadow-2xl`}
                    >
                      <div className='w-full h-full bg-black/80 backdrop-blur-sm rounded-3xl p-8 flex flex-col'>
                        <div className='text-center mb-8'>
                          <h3 className='text-3xl font-bold text-white mb-2'>
                            {stack.category}
                          </h3>
                          <div
                            className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${stack.color}`}
                          />
                        </div>

                        <div className='space-y-6 flex-1'>
                          {stack.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech.name}
                              initial={{ opacity: 0, x: -50 }}
                              animate={{
                                opacity: isActive ? 1 : 0.5,
                                x: isActive ? 0 : -20,
                              }}
                              transition={{ delay: techIndex * 0.1 }}
                              className='space-y-2'
                            >
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                  <span className='text-2xl'>{tech.icon}</span>
                                  <span className='text-white font-medium'>
                                    {tech.name}
                                  </span>
                                </div>
                                <span className='text-white/60 text-sm'>
                                  {tech.level}%
                                </span>
                              </div>

                              <div className='h-2 bg-white/10 rounded-full overflow-hidden'>
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${stack.color} rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: isActive ? `${tech.level}%` : 0,
                                  }}
                                  transition={{
                                    duration: 1,
                                    delay: techIndex * 0.1,
                                  }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation */}
          <div
            className='absolute top-1/2 -translate-y-1/2 left-4'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              onClick={prevStack}
              variant='outline'
              size='icon'
              className='w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
            >
              <ChevronLeft className='w-6 h-6' />
            </Button>
          </div>

          <div
            className='absolute top-1/2 -translate-y-1/2 right-4'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Button
              onClick={nextStack}
              variant='outline'
              size='icon'
              className='w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
            >
              <ChevronRight className='w-6 h-6' />
            </Button>
          </div>

          {/* Indicators */}
          <div className='flex justify-center gap-3 mt-8'>
            {techStacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
