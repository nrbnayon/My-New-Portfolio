"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Globe,
  Lock,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";

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

interface BrowserMockupProps {
  project: Project;
  isHovered?: boolean;
  className?: string;
  height?: string;
  showControls?: boolean;
  autoSlideOnHover?: boolean;
}

export default function BrowserMockup({
  project,
  isHovered = false,
  className = "",
  height = "h-48",
  showControls = true,
  autoSlideOnHover = true,
}: BrowserMockupProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<"forward" | "backward">("forward");

  // Fix: Ensure we always have valid images, filter out placeholder SVGs for real projects
  const images =
    project.images && project.images.length > 0
      ? project.images.filter((img) => img && !img.includes("placeholder.svg"))
      : project.image && !project.image.includes("placeholder.svg")
        ? [project.image]
        : [];

  // If no real images, use a default project screenshot or the original image
  const displayImages =
    images.length > 0
      ? images
      : [project.image || "/placeholder.svg?height=200&width=400"];
  const hasMultipleImages = displayImages.length > 1;

  // Update direction ref when direction state changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!hasMultipleImages) return;

    // Clear any existing intervals
    stopAutoScroll();
    setIsPlaying(true);

    const scroll = () => {
      setCurrentImageIndex((prevIndex) => {
        let nextIndex;
        const currentDirection = directionRef.current;

        if (currentDirection === "forward") {
          nextIndex = prevIndex + 1;
          if (nextIndex >= displayImages.length) {
            setDirection("backward");
            directionRef.current = "backward";
            return displayImages.length - 2 >= 0 ? displayImages.length - 2 : 0;
          }
        } else {
          nextIndex = prevIndex - 1;
          if (nextIndex < 0) {
            setDirection("forward");
            directionRef.current = "forward";
            return 1 < displayImages.length ? 1 : 0;
          }
        }

        return nextIndex;
      });
    };

    // Initial delay before starting
    timeoutRef.current = setTimeout(() => {
      scroll();
      intervalRef.current = setInterval(scroll, 2500);
    }, 1000);
  }, [hasMultipleImages, displayImages.length, stopAutoScroll]);

  const resetToStart = useCallback(() => {
    setCurrentImageIndex(0);
    setDirection("forward");
    directionRef.current = "forward";
  }, []);

  useEffect(() => {
    if (autoSlideOnHover && isHovered && hasMultipleImages) {
      startAutoScroll();
    } else {
      stopAutoScroll();
      // Small delay before resetting to avoid jarring transitions
      const resetTimeout = setTimeout(resetToStart, 300);
      return () => clearTimeout(resetTimeout);
    }

    // Cleanup on unmount
    return () => {
      stopAutoScroll();
    };
  }, [
    isHovered,
    hasMultipleImages,
    startAutoScroll,
    stopAutoScroll,
    resetToStart,
    autoSlideOnHover,
  ]);

  const handleBrowserClick = () => {
    if (project.liveLink) {
      window.open(project.liveLink, "_blank", "noopener,noreferrer");
    }
  };

  const getImageTransform = (index: number) => {
    if (index === currentImageIndex) return "translateY(0%)";
    if (index < currentImageIndex) return "translateY(-100%)";
    return "translateY(100%)";
  };

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-lg overflow-hidden shadow-lg ${className}`}
    >
      {/* Browser Chrome */}
      <div className='flex items-center justify-between bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm px-4 py-3 border-b border-gray-300 dark:border-gray-600'>
        {/* Traffic Light Buttons */}
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 bg-red-500 rounded-full shadow-sm hover:bg-red-600 transition-colors cursor-pointer'></div>
          <div className='w-3 h-3 bg-yellow-500 rounded-full shadow-sm hover:bg-yellow-600 transition-colors cursor-pointer'></div>
          <div className='w-3 h-3 bg-green-500 rounded-full shadow-sm hover:bg-green-600 transition-colors cursor-pointer'></div>
        </div>

        {/* Address Bar */}
        <div
          className='flex-1 mx-4 bg-gray-50 dark:bg-gray-600 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-white dark:hover:bg-gray-500 transition-all shadow-inner'
          onClick={handleBrowserClick}
        >
          <div className='flex items-center text-gray-700 dark:text-gray-200'>
            {project.liveLink ? (
              <>
                <Lock className='w-3 h-3 mr-2 text-green-500' />
                <Globe className='w-3 h-3 mr-2 text-blue-500' />
                <span className='truncate font-medium'>
                  {project.liveLink
                    .replace("https://", "")
                    .replace("http://", "")}
                </span>
              </>
            ) : (
              <>
                <Globe className='w-3 h-3 mr-2 text-gray-400' />
                <span className='text-gray-500'>localhost:3000</span>
              </>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        {showControls && (
          <div className='flex items-center space-x-1'>
            {hasMultipleImages && (
              <button
                className='p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors'
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPlaying) {
                    stopAutoScroll();
                  } else {
                    startAutoScroll();
                  }
                }}
                title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? (
                  <Pause className='w-3 h-3 text-gray-600 dark:text-gray-300' />
                ) : (
                  <Play className='w-3 h-3 text-gray-600 dark:text-gray-300' />
                )}
              </button>
            )}
            <button
              className='p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors'
              onClick={handleBrowserClick}
              title='Visit Live Site'
            >
              <RotateCcw className='w-3 h-3 text-gray-600 dark:text-gray-300' />
            </button>
          </div>
        )}
      </div>

      {/* Browser Content */}
      <div
        className={`relative ${height} w-full overflow-hidden cursor-pointer group bg-white dark:bg-gray-800`}
        onClick={handleBrowserClick}
      >
        <div className='relative w-full h-full'>
          {displayImages.map((img, index) => (
            <div
              key={index}
              className='absolute inset-0 transition-all duration-1000 ease-in-out'
              style={{
                transform: getImageTransform(index),
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            >
              <Image
                src={img}
                alt={`${project.title} - Screenshot ${index + 1}`}
                fill
                className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg?height=200&width=400";
                }}
              />
            </div>
          ))}

          {/* Hover Overlay */}
          <div
            className={`absolute text-black inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className='bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-6 py-3 rounded-full flex items-center space-x-2 text-sm font-medium shadow-lg transform transition-transform duration-300 hover:scale-105'>
              <ExternalLink className='w-4 h-4' />
              <span>View Live Site</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {hasMultipleImages && isPlaying && (
          <div className='absolute bottom-0 left-0 right-0 h-1 bg-black/20'>
            <div
              className='h-full bg-blue-500 transition-all duration-2500 ease-linear'
              style={{
                width: `${((currentImageIndex + 1) / displayImages.length) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Image Indicator Dots */}
        {hasMultipleImages && (
          <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                  setDirection("forward");
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
