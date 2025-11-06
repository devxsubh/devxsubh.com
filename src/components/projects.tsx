"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"

import { SectionHeading, TextReveal } from "./ui/Typography"
import type { Project } from "../utils/interface"
import { useVariants } from "../utils/hooks"
import { SlideIn, Transition } from "./ui/Transitions"
import Filters from "./filters"

interface ProjectsProps {
  projects: Project[]
}

function Projects({ projects }: ProjectsProps) {
  // Sort projects by sequence and filter enabled ones
  // const projects = projects.filter((project) => project.enabled).sort((a, b) => a.sequence - b.sequence)

  const [filteredProjects, setFilteredProjects] = useState([...projects].reverse())
  const [filterValue, setFilterValue] = useState("all")
  const [showMore, setShowMore] = useState(false)

  const numProjectToShow = 6

  // Helper function to determine project category based on tech stack
  const getProjectCategory = (techStack: string[]) => {
    const tech = techStack.map((t) => t.trim().toLowerCase())
    if (tech.includes("reactjs") || tech.includes("nextjs")) return "Web Development"
    if (tech.includes("mern")) return "Full Stack"
    if (tech.includes("flutter")) return "App Development"
    if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return "Blockchain"
    if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return "AI/ML"
    if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return "IoT"
    return "Development"
  }

  const applyFilters = useCallback(() => {
    const filtered = projects.filter((project) => {
      if (filterValue === "all") return true
      const projectCategory = getProjectCategory(project.techStack)
      return projectCategory === filterValue
    })
    setFilteredProjects(filtered.reverse())
  }, [projects, filterValue])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  // Handle dialog close with immediate body overflow restoration


  return (
    <section className="md:p-8 p-4 mt-20 relative" id="projects">
      <SectionHeading className="">
        <SlideIn className="text-white/40">Selected</SlideIn>
        <br />
        <SlideIn>works</SlideIn>
      </SectionHeading>

      <Filters projects={projects} filterValue={filterValue} setFilterValue={setFilterValue} />

      <motion.div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 relative">
        <AnimatePresence mode="popLayout">
          {filteredProjects.slice(0, showMore ? filteredProjects.length : numProjectToShow).map((project, index) => (
            <Transition
              transition={{ delay: 0.1 + index * 0.05 }}
              viewport={{ once: true }}
              key={project._id}
              layoutId={project._id}
            >
              <Card {...project} />
            </Transition>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="grid place-items-center py-12">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/projects"
            className="text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-8 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2"
          >
            <TextReveal>View All Projects</TextReveal>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

interface CardProps extends Project {}

const Card = ({ _id, title, description, image, liveurl, githuburl, techStack }: CardProps) => {
  const [hover, setHover] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { setVariant } = useVariants()


  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation()
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const mouseEnter = () => {
    setHover(true)
    setVariant?.("PROJECT")
  }

  const mouseLeave = () => {
    setHover(false)
    setVariant?.("DEFAULT")
  }

  // Get primary tech stack for category display
  const primaryTech = techStack?.[0]?.trim() || "Project"

  // Determine category based on tech stack
  const getCategory = () => {
    const tech = techStack.map((t) => t.trim().toLowerCase())
    if (tech.includes("reactjs") || tech.includes("nextjs")) return "Web Development"
    if (tech.includes("mern")) return "Full Stack"
    if (tech.includes("flutter")) return "App Development"
    if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return "Blockchain"
    if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return "AI/ML"
    if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return "IoT"
    return "Development"
  }

  return (
    <Link href={`/projects/${_id}`}>
      <motion.article
        className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`View project: ${title}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <Image
          src={image.url || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${hover ? "scale-110" : "scale-105"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          priority
        />
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      {/* Category Tag */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <span className="bg-black/30 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium px-2.5 py-1 md:px-4 md:py-2 rounded-full border border-white/20">
          {getCategory()}
        </span>
      </div>

      {/* Action buttons - only show if URLs are not placeholder */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <div
          className={`flex gap-1.5 md:gap-2 transition-all duration-300 ${
            hover ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {liveurl && liveurl !== "#" && (
            <button
              onClick={(e) => handleExternalLink(e, liveurl)}
              className="p-2 md:p-2.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-black/50 transition-colors duration-200"
              aria-label="View live project"
            >
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          )}
          {githuburl && githuburl !== "#" && (
            <button
              onClick={(e) => handleExternalLink(e, githuburl)}
              className="p-2 md:p-2.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-black/50 transition-colors duration-200"
              aria-label="View source code"
            >
              <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
        <motion.div animate={{ y: hover ? -4 : 0 }} transition={{ duration: 0.3 }}>
          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight md:leading-relaxed line-clamp-1 pr-4 md:pr-12">{title}</h3>
          {/* <p className="text-white/80 pr-8 text-sm leading-relaxed line-clamp-1 pr-4">{description}</p> */}

          {/* Tech Stack Preview */}
          {/* <div className="flex flex-wrap gap-1 mt-3">
            {techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20"
              >
                {tech.trim()}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="text-xs text-white/50 bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
                +{techStack.length - 3}
              </span>
            )}
          </div> */}
        </motion.div>
      </div>

      {/* Arrow Icon */}
      {/* <div className="absolute bottom-6 right-6">
        <motion.div
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          animate={{
            scale: hover ? 1.1 : 1,
            backgroundColor: hover ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.2)",
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-5 h-5 text-white" />
        </motion.div>
      </div> */}

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 pointer-events-none"
        animate={{
          borderColor: hover ? "rgba(255, 255, 255, 0.3)" : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
      </motion.article>
    </Link>
  )
}

export default Projects
