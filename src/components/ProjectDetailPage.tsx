"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Calendar, Clock, Users, Award, CheckCircle, Tag } from "lucide-react"
import type { Project } from "@/utils/interface"

interface ProjectDetailPageProps {
  project: Project
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project }) => {
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

  const category = getProjectCategory(project.techStack)
  const hasValidLinks = project.liveurl !== "#" || project.githuburl !== "#"

  return (
    <article>
      {/* Project Header */}
      <div className="mb-8">

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">{project.title}</h1>
        <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
          {project.overview || project.description}
        </p>
      </div>

      {/* Project Hero Image */}
      <div className="mb-12 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 aspect-video relative">
        <Image 
          src={project.image.url || "/placeholder.svg"} 
          alt={project.title} 
          fill
          className="object-cover" 
          priority
        />
      </div>

      {/* Project Meta Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-muted/30 rounded-xl border border-border">
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline</p>
          <p className="text-lg font-bold text-foreground">{project.timeline || "2-3 months"}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Role</p>
          <p className="text-lg font-bold text-foreground">{project.role || "Full Stack Developer"}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Team</p>
          <p className="text-lg font-bold text-foreground">{project.team || "Solo"}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</p>
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
            {project.status || "Completed"}
          </div>
        </div>
      </div>

      {/* Action Links */}
      {hasValidLinks && (
        <div className="flex gap-4 mb-12">
          {project.liveurl !== "#" && (
            <Link
              href={project.liveurl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Link>
          )}
          {project.githuburl !== "#" && (
            <Link
              href={project.githuburl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </Link>
          )}
        </div>
      )}

      {/* Technology Stack Section */}
      <div className="mb-12 p-6 bg-muted/30 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Key Learnings */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
          <ul className="space-y-3">
            {project.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-foreground/80 text-sm leading-normal">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Features and Challenges - Side by Side */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Key Features */}
        {project.learnings && project.learnings.length > 0 && (
          <div className="p-6 bg-muted/30 rounded-xl border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Key Learnings</h2>
            <ul className="space-y-3">
              {project.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3">
                 <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{learning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="p-6 bg-muted/30 rounded-xl border border-orange-500/20">
            <h2 className="text-xl font-bold text-foreground mb-4">Key Challenges</h2>
            <ul className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Impact & Results */}
      {project.impact && project.impact.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Impact & Results</h2>
          <ul className="space-y-3">
            {project.impact.map((impact, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80 text-sm leading-normal">{impact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Future Enhancements */}
      {project.futureEnhancements && project.futureEnhancements.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Future Enhancements</h2>
          <ul className="space-y-3">
            {project.futureEnhancements.map((enhancement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-foreground/80 text-sm leading-normal">{enhancement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

export default ProjectDetailPage
