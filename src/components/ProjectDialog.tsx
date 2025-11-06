"use client"

import type { DialogProps } from "@/types/dialogProps"
import type { Project } from "@/utils/interface"
import { motion } from "framer-motion"
import { X, Layers, ExternalLink, Github, Code, Target, Lightbulb, TrendingUp, Rocket, CheckCircle, ChevronDown, Clock, Users, Award, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useEffect, useState, useRef } from "react"

export const ProjectDialog = ({ selectedProject, setSelectedProject }: DialogProps) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Handle escape key and body overflow
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Handle both function signatures
        if (typeof setSelectedProject === 'function') {
          if (setSelectedProject.length === 0) {
            // No parameters - it's our handleCloseDialog function
            (setSelectedProject as () => void)()
          } else {
            // Takes parameter - it's the original setSelectedProject
            (setSelectedProject as (project: Project | null) => void)(null)
          }
        }
      }
    }

    // Store original overflow value
    const originalOverflow = document.body.style.overflow

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      // Restore original overflow or set to auto for better compatibility
      document.body.style.overflow = originalOverflow || "auto"
    }
  }, [setSelectedProject])

  // Additional cleanup effect that runs when component unmounts
  useEffect(() => {
    return () => {
      // Ensure body overflow is always restored when component unmounts
      document.body.style.overflow = "auto"
    }
  }, [])

  // Handle scroll detection for indicator
  useEffect(() => {
    const checkScrollable = () => {
      const container = scrollContainerRef.current
      if (container) {
        const isScrollable = container.scrollHeight > container.clientHeight
        const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10
        setShowScrollIndicator(isScrollable && !isAtBottom)
      }
    }

    const handleScroll = () => {
      checkScrollable()
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      // Check initially after a short delay to ensure content is rendered
      setTimeout(checkScrollable, 100)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [selectedProject])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // Handle both function signatures
      if (typeof setSelectedProject === 'function') {
        if (setSelectedProject.length === 0) {
          // No parameters - it's our handleCloseDialog function
          (setSelectedProject as () => void)()
        } else {
          // Takes parameter - it's the original setSelectedProject
          (setSelectedProject as (project: Project | null) => void)(null)
        }
      }
    }
  }

  const hasValidLinks = selectedProject.liveurl !== "#" || selectedProject.githuburl !== "#"

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Dialog */}
      <motion.div
        layoutId={selectedProject._id}
        className="relative w-full h-full md:h-auto max-w-full md:max-w-7xl md:max-h-[85vh] bg-zinc-900 rounded-none md:rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          layout: { duration: 0.3 },
        }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-black/90 transition-colors duration-200"
          onClick={() => {
            // Handle both function signatures
            if (typeof setSelectedProject === 'function') {
              if (setSelectedProject.length === 0) {
                // No parameters - it's our handleCloseDialog function
                (setSelectedProject as () => void)()
              } else {
                // Takes parameter - it's the original setSelectedProject
                (setSelectedProject as (project: Project | null) => void)(null)
              }
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close dialog"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.1 }}
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        <div className="flex flex-col lg:flex-row h-full md:max-h-[85vh]">
          {/* Image Section */}
          <motion.div
            className="relative lg:w-3/5 h-[40vh] sm:h-[55vh] lg:h-auto flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Image
              src={selectedProject.image.url || "/placeholder.svg"}
              alt={selectedProject.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            {/* Subtle gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Project Category Badge */}
            <motion.div
              className="absolute top-16 left-4 md:top-4 md:left-4 lg:top-6 lg:left-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30 font-medium text-xs md:text-sm shadow-lg">
                {(() => {
                  const tech = selectedProject.techStack.map((t) => t.trim().toLowerCase())
                  if (tech.includes("reactjs") || tech.includes("nextjs")) return "Web Development"
                  if (tech.includes("mern")) return "Full Stack"
                  if (tech.includes("flutter")) return "App Development"
                  if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return "Blockchain"
                  if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return "AI/ML"
                  if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return "IoT"
                  return "Development"
                })()}
              </div>
            </motion.div>

            {/* Project Title Overlay */}
            <motion.div
              className="absolute bottom-14 left-4 right-4 md:bottom-16 lg:bottom-20 md:left-4 md:right-4 lg:left-6 lg:right-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight drop-shadow-lg mb-1 md:mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-white/90 text-xs md:text-sm leading-relaxed drop-shadow-md line-clamp-2">
                {selectedProject.description}
              </p>
            </motion.div>

            {/* Technology Stack on Image */}
            <motion.div
              className="absolute bottom-2 left-4 right-4 md:bottom-3 lg:bottom-4 md:left-4 md:right-4 lg:left-6 lg:right-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {selectedProject.techStack.slice(0, 6).map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-2 py-0.5 md:px-3 md:py-1 bg-white/90 backdrop-blur-sm text-gray-800 border border-white/50 rounded md:rounded-lg text-[10px] md:text-xs font-semibold shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.8 + index * 0.05, duration: 0.2 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                  >
                    {tech.trim()}
                  </motion.span>
                ))}
                {selectedProject.techStack.length > 6 && (
                  <motion.span
                    className="px-2 py-0.5 md:px-3 md:py-1 bg-white/70 backdrop-blur-sm text-gray-600 border border-white/30 rounded md:rounded-lg text-[10px] md:text-xs font-semibold shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.8 + 6 * 0.05, duration: 0.2 }}
                  >
                    +{selectedProject.techStack.length - 6}
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Action Links on Image */}
            {hasValidLinks && (
              <motion.div
                className="absolute top-16 right-4 md:top-4 md:right-4 lg:top-6 lg:right-6 flex flex-col gap-2 md:gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                {selectedProject.liveurl !== "#" && (
                  <Link
                    href={selectedProject.liveurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white transition-colors duration-200 shadow-lg border border-white/50 flex items-center justify-center"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                )}
                {selectedProject.githuburl !== "#" && (
                  <Link
                    href={selectedProject.githuburl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 bg-gray-800/90 backdrop-blur-sm text-white border border-gray-600/50 rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-lg flex items-center justify-center"
                    title="Source Code"
                  >
                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="lg:w-2/5 p-4 md:p-5 lg:p-6 flex flex-col overflow-hidden flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Header - Fixed */}
            <div className="mb-4">
              {/* Title is now on the image overlay */}
            </div>

            {/* Scrollable Content */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto space-y-3 md:space-y-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >

                {/* Overview */}
              {selectedProject.overview && (
                <motion.div
                  className="space-y-2 md:space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <Code className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                    Overview
                  </h3>
                  <p className="text-white/70 leading-relaxed text-xs md:text-sm">{selectedProject.overview}</p>
                  </motion.div>
                )}

                 {/* Project Details Panel */}
                 <motion.div
                   className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg md:rounded-xl border border-white/10"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ delay: 1.1, duration: 0.3 }}
                 >
                   <div className="text-left">
                     <p className="text-white/60 text-[10px] md:text-xs font-medium mb-0.5">Timeline</p>
                     <p className="text-white font-semibold text-xs md:text-sm">{selectedProject.timeline || "2-3 months"}</p>
                   </div>
                   <div className="text-left">
                     <p className="text-white/60 text-[10px] md:text-xs font-medium mb-0.5">Team Size</p>
                     <p className="text-white font-semibold text-xs md:text-sm">{selectedProject.team || "Solo"}</p>
                   </div>
                   <div className="text-left">
                     <p className="text-white/60 text-[10px] md:text-xs font-medium mb-0.5">Role</p>
                     <p className="text-white font-semibold text-xs md:text-sm">{selectedProject.role || "Full Stack"}</p>
                   </div>
                   <div className="text-left">
                     <p className="text-white/60 text-[10px] md:text-xs font-medium mb-0.5">Status</p>
                     <p className="text-white font-semibold text-xs md:text-sm">{selectedProject.status || "Completed"}</p>
                   </div>
                 </motion.div>

              {/* Fallback Description if no overview */}
              {!selectedProject.overview && (
              <motion.div
                  className="space-y-2 md:space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                  About This Project
                </h3>
                  <p className="text-white/70 leading-relaxed text-xs md:text-sm">{selectedProject.description}</p>
              </motion.div>
              )}


              {/* Key Features */}
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
              <motion.div
                  className="space-y-2 md:space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Challenges */}
              {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                <motion.div
                  className="space-y-2 md:space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                    Key Challenges
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Learnings */}
              {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                <motion.div
                  className="space-y-2 md:space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                    Key Learnings
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Impact */}
              {selectedProject.impact && selectedProject.impact.length > 0 && (
                <motion.div
                  className="space-y-2 md:space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                    Impact & Results
                </h3>
                  <ul className="space-y-2">
                    {selectedProject.impact.map((impact, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{impact}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Future Enhancements */}
              {selectedProject.futureEnhancements && selectedProject.futureEnhancements.length > 0 && (
                <motion.div
                  className="space-y-2 md:space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                    <Rocket className="w-4 h-4 md:w-5 md:h-5 text-white/60" />
                    Future Enhancements
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.futureEnhancements.map((enhancement, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70 text-xs md:text-sm">
                        <Rocket className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{enhancement}</span>
                      </li>
                    ))}
                  </ul>
              </motion.div>
              )}

            {/* Footer */}
            <motion.div
                className="pt-4 mt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
                transition={{ delay: 1.1, duration: 0.3 }}
            >
                <p className="text-white/50 text-xs">
                Click outside or press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ESC</kbd> to close
              </p>
            </motion.div>
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <motion.div
                className="absolute bottom-4 left-[50%] md:left-[75%] lg:left-[78%] transform -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 md:p-2 border border-white/20"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/80" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
