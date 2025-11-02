"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, Search, Filter, Calendar, User, Clock, CheckCircle } from "lucide-react";
import { Portfolio } from "@/utils/interface";
import Link from "next/link";
import { useVariants } from "@/utils/hooks";
import { SectionHeading, TextReveal } from "@/components/ui/Typography";
import { SlideIn, Transition } from "@/components/ui/Transitions";
import Header from "@/components/header";
import Footer from "@/components/Footer";

// Import portfolio data
import portfolioData from "@/dummy.json";

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const portfolio = portfolioData as Portfolio;
  const { projects } = portfolio;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("sequence");

  const { setVariant } = useVariants();

  // Get unique categories from projects
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    projects.forEach((project) => {
      const tech = project.techStack.map((t) => t.trim().toLowerCase());
      if (tech.includes("reactjs") || tech.includes("nextjs")) categorySet.add("Web Development");
      else if (tech.includes("mern")) categorySet.add("Full Stack");
      else if (tech.includes("flutter")) categorySet.add("App Development");
      else if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) categorySet.add("Blockchain");
      else if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) categorySet.add("AI/ML");
      else if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) categorySet.add("IoT");
      else categorySet.add("Development");
    });
    return ["all", ...Array.from(categorySet).sort()];
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === "all" || (() => {
        const tech = project.techStack.map((t) => t.trim().toLowerCase());
        if (tech.includes("reactjs") || tech.includes("nextjs")) return selectedCategory === "Web Development";
        if (tech.includes("mern")) return selectedCategory === "Full Stack";
        if (tech.includes("flutter")) return selectedCategory === "App Development";
        if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return selectedCategory === "Blockchain";
        if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return selectedCategory === "AI/ML";
        if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return selectedCategory === "IoT";
        return selectedCategory === "Development";
      })();

      return matchesSearch && matchesCategory;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "sequence":
          return a.sequence - b.sequence;
        case "title":
          return a.title.localeCompare(b.title);
        case "timeline":
          return a.timeline?.localeCompare(b.timeline || "") || 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, sortBy]);


  const getProjectCategory = (techStack: string[]) => {
    const tech = techStack.map((t) => t.trim().toLowerCase());
    if (tech.includes("reactjs") || tech.includes("nextjs")) return "Web Development";
    if (tech.includes("mern")) return "Full Stack";
    if (tech.includes("flutter")) return "App Development";
    if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return "Blockchain";
    if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return "AI/ML";
    if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return "IoT";
    return "Development";
  };

  return (
    <div className="min-h-screen mt-8 text-white">
      
      <Header social={portfolio.social_handles} />
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />

      {/* Header */}
      <div className="relative py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading className="mb-2">
            <SlideIn className="text-white/40">All</SlideIn>
            <br />
            <SlideIn>Projects</SlideIn>
          </SectionHeading>
          
          <p className="text-white/60 text-lg max-w-2xl mb-12">
            Explore my complete portfolio of projects spanning web development, AI/ML, blockchain, IoT, and more. 
            Each project represents a unique challenge and learning opportunity.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <Transition
                  key={project._id}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  layoutId={project._id}
                >
                  <ProjectCard 
                    project={project} 
                    getCategory={getProjectCategory}
                  />
                </Transition>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

interface ProjectCardProps {
  project: any;
  getCategory: (techStack: string[]) => string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, getCategory }) => {
  const [hover, setHover] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setVariant } = useVariants();

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const mouseEnter = () => {
    setHover(true);
    setVariant?.("PROJECT");
  };

  const mouseLeave = () => {
    setHover(false);
    setVariant?.("DEFAULT");
  };

  const category = getCategory(project.techStack);

  return (
    <Link href={`/projects/${project._id}`}>
      <motion.article
        className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
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
          src={project.image.url || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${hover ? "scale-110" : "scale-105"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* Category Tag */}
      <div className="absolute top-4 left-4">
        <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
          {category}
        </span>
      </div>

      {/* Status Badge */}
      {/* {project.status && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
            <CheckCircle className="w-3 h-3" />
            {project.status}
          </div>
        </div>
      )} */}

      {/* Action buttons */}
      <div className="absolute top-4 right-4">
        <div
          className={`flex gap-2 transition-all duration-300 ${
            hover ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {project.liveurl && project.liveurl !== "#" && (
            <button
              onClick={(e) => handleExternalLink(e, project.liveurl)}
              className="p-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-black/50 transition-colors duration-200"
              aria-label="View live project"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          {project.githuburl && project.githuburl !== "#" && (
            <button
              onClick={(e) => handleExternalLink(e, project.githuburl)}
              className="p-2 bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-black/50 transition-colors duration-200"
              aria-label="View source code"
            >
              <Github className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div animate={{ y: hover ? -4 : 0 }} transition={{ duration: 0.3 }}>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-white/60">
            {project.timeline && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {project.timeline}
              </div>
            )}
            {project.role && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {project.role}
              </div>
            )}
          </div>
          {/* <p className="text-white/80 text-sm leading-relaxed line-clamp-1 mb-3">
            {project.description}
          </p> */}


          {/* Tech Stack Preview */}
          {/* <div className="flex flex-wrap gap-1 mt-3">
            {project.techStack.slice(0, 3).map((tech: string, index: number) => (
              <span
                key={index}
                className="text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20"
              >
                {tech.trim()}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs text-white/50 bg-white/10 backdrop-blur-sm px-2 py-1 rounded border border-white/20">
                +{project.techStack.length - 3}
              </span>
            )}
          </div> */}
        </motion.div>
      </div>

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
  );
};

export default ProjectsPage;
