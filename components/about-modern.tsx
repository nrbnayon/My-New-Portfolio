"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Code, Zap, Users, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useEffect, useRef, useState } from "react";

type Profile = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  objective: string;
  resumeUrl: string;
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  updatedAt: string;
};

export default function AboutModern() {
  const [profile, setProfile] = useState<Profile>({
    _id: "",
    name: "Nayon Kanti Halder",
    email: "nrbnayon@gmail.com",
    phone: "+880 1934025581",
    location: "Dhaka, Bangladesh",
    bio: "",
    objective: "",
    resumeUrl: "",
    profileImage: "",
    socialLinks: {
      github: "https://github.com/nrbnayon",
      linkedin: "https://www.linkedin.com/in/itsnayon",
      twitter: "",
    },
    updatedAt: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    {
      icon: <Code className='w-6 h-6' />,
      value: "50+",
      label: "Projects Completed",
    },
    {
      icon: <Zap className='w-6 h-6' />,
      value: "2+",
      label: "Years Experience",
    },
    {
      icon: <Users className='w-6 h-6' />,
      value: "10+",
      label: "Happy Clients",
    },
    {
      icon: <Award className='w-6 h-6' />,
      value: "5+",
      label: "Technologies Mastered",
    },
  ];

  // Get display text with fallbacks
  const displayBio =
    profile.bio ||
    "I'm an enthusiastic and detail-oriented Full Stack Developer with a solid foundation in modern web technologies. My passion lies in creating innovative digital solutions that bridge the gap between cutting-edge technology and user-centric design.";

  const displayObjective =
    profile.objective ||
    "Currently working at Join Venture AI, I specialize in the MERN stack and have extensive experience with AI integration, making applications smarter and more intuitive. I believe in the power of technology to transform ideas into reality.";

  const additionalText =
    "When I'm not coding, you'll find me exploring the latest in AI and machine learning, contributing to open-source projects, or mentoring aspiring developers in my community.";

  return (
    <section ref={ref} id='about' className='relative py-32 overflow-hidden'>
      <motion.div style={{ opacity }} className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
              About Me
            </span>
          </h2>
          <p className='text-xl text-white/70 max-w-3xl mx-auto'>
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Image Section */}
          <motion.div style={{ y }} className='relative'>
            <div className='relative'>
              {/* Animated border */}
              <motion.div
                className='absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1'
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className='w-full h-full bg-black rounded-3xl' />
              </motion.div>

              {/* Profile image */}
              <div className='relative z-10 p-8'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className='relative aspect-square rounded-2xl overflow-hidden'
                >
                  <Image
                    src={
                      profile.profileImage ||
                      "/placeholder.svg?height=500&width=500"
                    }
                    alt={profile.name}
                    fill
                    className='object-cover'
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className='absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl'
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <motion.div
                className='absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 opacity-20 blur-xl'
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <GlassCard className='p-8'>
              <h3 className='text-3xl font-bold text-white mb-6'>
                Full Stack Developer & AI Enthusiast
              </h3>
              <div className='space-y-4 text-white/80 leading-relaxed'>
                <p>{displayBio}</p>
                <p>{displayObjective}</p>
                <p>{additionalText}</p>
              </div>
            </GlassCard>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-4'>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <GlassCard className='p-6 text-center'>
                    <div className='text-blue-400 mb-2 flex justify-center'>
                      {stat.icon}
                    </div>
                    <div className='text-2xl font-bold text-white mb-1'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-white/60'>{stat.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Personal Info */}
            <GlassCard className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                <div>
                  <span className='text-white/60'>Name:</span>
                  <span className='text-white ml-2'>{profile.name}</span>
                </div>
                <div>
                  <span className='text-white/60'>Email:</span>
                  <span className='text-white ml-2'>{profile.email}</span>
                </div>
                <div>
                  <span className='text-white/60'>Location:</span>
                  <span className='text-white ml-2'>{profile.location}</span>
                </div>
                <div>
                  <span className='text-white/60'>Phone:</span>
                  <span className='text-white ml-2'>{profile.phone}</span>
                </div>
              </div>
            </GlassCard>

            {/* CTA Button - Only show if resumeUrl exists */}
            {profile.resumeUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Button
                  size='lg'
                  className='group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl'
                  onClick={() => window.open(profile.resumeUrl, "_blank")}
                >
                  <span className='relative z-10 flex items-center gap-2'>
                    <Download className='w-5 h-5 group-hover:animate-bounce' />
                    Download Resume
                  </span>
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
