"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { About as IAbout, Timeline } from "../utils/interface";
import { OpacityTextReveal, SlideIn, Transition } from "./ui/Transitions";
import { formatDate } from "../utils";
import { Tilt } from "./ui/tilt";
import { Button } from "./ui/button";
import { AboutHero } from "./about-hero";
import GitHubActivity from "./GitHubActivity";
import { ExperienceCard } from "./ExperienceCard";
import { Experience } from "@/config/Experience";
import { TooltipProvider } from "./ui/tooltip";
import Footer from "./Footer";

// Technology Icons
import NextJs from './technologies/NextJs';
import ReactIcon from './technologies/ReactIcon';
import TypeScript from './technologies/TypeScript';
import NodeJs from './technologies/NodeJs';
import TailwindCss from './technologies/TailwindCss';
import MongoDB from './technologies/MongoDB';
import AWS from './technologies/AWS';
import JavaScript from './technologies/JavaScript';
import ExpressJs from './technologies/ExpressJs';
import PostgreSQL from './technologies/PostgreSQL';
import Figma from './technologies/Figma';
import ThreeJs from './technologies/ThreeJs';

interface AboutContentProps {
  about: IAbout;
  timeline: Timeline[];
  socialHandles?: any[];
}

const AboutContent = ({ about, timeline, socialHandles }: AboutContentProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(new Set());

  // Technology mapping with icons
  const technologyIcons: { [key: string]: React.JSX.Element } = {
    'React.js': <div className="w-4 h-4"><ReactIcon className="w-4 h-4" /></div>,
    'Next.js': <div className="w-4 h-4"><NextJs className="w-4 h-4" /></div>,
    'Node.js': <div className="w-4 h-4"><NodeJs className="w-4 h-4" /></div>,
    'Express.js': <div className="w-4 h-4"><ExpressJs /></div>,
    'MongoDB': <div className="w-4 h-4"><MongoDB className="w-4 h-4" /></div>,
    'SQL': <div className="w-4 h-4"><PostgreSQL /></div>,
    'Python': <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">Py</div>,
    'UI/UX design': <div className="w-4 h-4"><Figma /></div>,
    'cloud integration': <div className="w-4 h-4"><AWS className="w-4 h-4" /></div>,
    'API development': <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">API</div>,
    'Full Stack Developer': <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">FS</div>,
    'Tech Strategist': <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">TS</div>,
    'tech': <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>,
    'media': <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>,
    'e-commerce': <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">E</div>,
    'robotics': <div className="w-4 h-4 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">R</div>,
    'innovation': <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">I</div>,
    'problem-solving': <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center text-white text-xs font-bold">PS</div>,
    'cross-functional collaboration': <div className="w-4 h-4 bg-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">CF</div>,
    'AI-powered solutions': <div className="w-4 h-4 bg-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">AI</div>,
    'automation workflows': <div className="w-4 h-4 bg-teal-500 rounded flex items-center justify-center text-white text-xs font-bold">AW</div>,
    'Product Engineer': <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center text-white text-xs font-bold">PE</div>,
  };

  // Helper function to render technology tags with icons
  const renderTechnologyTag = (tech: string) => {
    const icon = technologyIcons[tech] || <div className="w-4 h-4 bg-gray-500 rounded flex items-center justify-center text-white text-xs font-bold">?</div>;
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
        {icon}
        {tech}
      </span>
    );
  };

  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  // Convert Timeline to Experience format
  const convertToExperience = (timelineItem: any): Experience => {
    return {
      company: timelineItem.company_name,
      position: timelineItem.jobTitle,
      startDate: formatDate(timelineItem.startDate).month + " " + formatDate(timelineItem.startDate).year,
      endDate: timelineItem.endDate ? formatDate(timelineItem.endDate).month + " " + formatDate(timelineItem.endDate).year : "Present",
      location: timelineItem.jobLocation,
      description: timelineItem.bulletPoints || [timelineItem.summary],
      technologies: [
        { name: "Next.js", icon: <NextJs className="w-4 h-4" />, href: "https://nextjs.org" },
        { name: "React", icon: <ReactIcon className="w-4 h-4" />, href: "https://reactjs.org" },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" />, href: "https://www.typescriptlang.org" },
        { name: "Node.js", icon: <NodeJs className="w-4 h-4" />, href: "https://nodejs.org" },
        { name: "Tailwind CSS", icon: <TailwindCss className="w-4 h-4" />, href: "https://tailwindcss.com" },
        { name: "MongoDB", icon: <MongoDB className="w-4 h-4" />, href: "https://www.mongodb.com" },
        { name: "JavaScript", icon: <JavaScript className="w-4 h-4" />, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "AWS", icon: <AWS className="w-4 h-4" />, href: "https://aws.amazon.com" }
      ],
      image: timelineItem.image || "/images/projects/Project (1).webp",
      website: timelineItem.website,
      linkedin: timelineItem.linkedin,
      x: timelineItem.x,
      github: timelineItem.github,
      isCurrent: timelineItem.isCurrent || false,
      isBlur: false
    };
  };

  return (
    <div>
      {/* Hero Section */}
      <AboutHero about={about} />

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Quote Section */}
      <section className="text-center">
        <blockquote className="text-3xl sm:text-4xl font-bold text-foreground italic">
          &quot;{about.quote}&quot;
        </blockquote>
      </section>

      {/* Description Section */}
      <section className="max-w-4xl mx-auto">
        <div className="relative">
        <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
          {/* <h2 className="text-2xl font-bold text-foreground mb-8">My Story</h2> */}
        <div className="prose prose-invert max-w-none">
            <div className="text-foreground/90 text-lg leading-relaxed space-y-6">
              <p>
                As a software developer with 2+ years of experience, I have honed my skills across various technologies and am currently diving deeper into AI/ML to expand my expertise. I pride myself on being a quick learner and attentive listener, which enables me to collaborate effectively with teams and create efficient, scalable solutions. My focus lies in building user-friendly applications that solve real-world problems.
              </p>
              
              <p className="text-foreground/80 text-base">
                (Find me online as @devxsubh)
              </p>
            </div>
          </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="/resume" className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </Link>
            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md bg-background border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-200 hover:scale-105">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Contact
            </Link>
          </div>

          {/* Social Media Links */}
          {about.socialLinks && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Connect with me</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(about.socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  
                  const getIcon = (platform: string) => {
                    switch (platform) {
                      case 'linkedin':
                        return (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        );
                      case 'github':
                        return (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        );
                      case 'instagram':
                        return (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        );
                      case 'x':
                        return (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        );
                      case 'leetcode':
                        return (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l2.396 2.392c.54.54 1.414.54 1.955.003.54-.54.54-1.414.003-1.955l-2.396-2.392A5.83 5.83 0 0 0 13.483 0zm-2.633 2.63L8.25 6.464 5.617 3.83l2.233-2.2z"/>
                          </svg>
                        );
                        case 'codeforces':
                          return (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h3z"/>
                            </svg>
                          );
                        case 'website':
                          return (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" className="w-5 h-5">
                            <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm11.36-77.6C96.06,57.67,82,83.49,80.21,120H40.37A88.19,88.19,0,0,1,107.59,42.4ZM40.37,136H80.21c1.82,36.51,15.85,62.33,27.38,77.6A88.19,88.19,0,0,1,40.37,136Zm108,77.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z"></path>
                          </svg>
                          );
                        case 'email':
                          return (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          );
                        default:
                          return (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          );
                    }
                  };

                    const getPlatformName = (platform: string) => {
                      switch (platform) {
                        case 'x': return 'X (Twitter)';
                        case 'leetcode': return 'LeetCode';
                        case 'codeforces': return 'Codeforces';
                        case 'website': return 'Website';
                        case 'email': return 'Email';
                        default: return platform.charAt(0).toUpperCase() + platform.slice(1);
                      }
                    };

                    return (
                      <Link
                        key={platform}
                        href={platform === 'email' ? `mailto:${url}` : url as string}
                        target={platform === 'email' ? '_self' : '_blank'}
                        rel={platform === 'email' ? '' : 'noopener noreferrer'}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted border border-border/50 hover:border-border transition-all duration-200 group"
                        title={getPlatformName(platform)}
                      >
                        {getIcon(platform)}
                      </Link>
                    );
                })}
              </div>
        </div>
          )}
      </section>

        {/* GitHub Activity Section */}
        {/* <section className="max-w-4xl mx-auto">
          <GitHubActivity />
      </section> */}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section>
            <div className="relative">
            <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-1">Featured</p>
              <h2 className="text-3xl font-bold text-foreground">Experience</h2>
            </div>
            <TooltipProvider>
              <div className="space-y-8">
            {experience.map((exp, index) => {
              const isExpanded = expandedExperiences.has(exp._id);
              const shouldShowFull = index < 2 || isExpanded;
              
              return (
                <motion.div 
                key={exp._id}
                  className="border border-border rounded-lg bg-muted/30 overflow-hidden"
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {shouldShowFull ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="p-6"
                    >
                      <ExperienceCard experience={convertToExperience(exp)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="p-6"
                    >
                      <div 
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => {
                          setExpandedExperiences(prev => new Set(prev).add(exp._id));
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Image
                              src={(exp as any).image || "/images/projects/Project (1).webp"}
                              alt={exp.company_name}
                              width={32}
                              height={32}
                              className="size-8 rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.company_name}
                            </h3>
                            <p className="text-sm text-foreground/70 font-medium">
                              {exp.jobTitle}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {formatDate(exp.startDate).month} {formatDate(exp.startDate).year} - {formatDate(exp.endDate).month} {formatDate(exp.endDate).year}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-foreground/60">{exp.jobLocation}</p>
                          <p className="text-xs text-foreground/50 mt-1 group-hover:text-foreground/70 transition-colors">
                            Click to view details
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
            </TooltipProvider>
            </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section>
          <div className="relative">
            <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />

          <h2 className="text-3xl font-bold text-foreground mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <TimelineCard
                key={edu._id}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                timeline={edu}
              />
            ))}
          </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="text-center py-12 border-t border-border">
        <div className="relative">
        <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Let&apos;s Work Together</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects. 
            Let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/contact">
                Get In Touch
              </Link>
              </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/projects">
                View My Work
              </Link>
              </Button>
          </div>
        </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutContent;

interface TimelineCardProps {
  timeline: Timeline;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  index: number;
}

const TimelineCard = ({
  timeline,
  activeIndex,
  setActiveIndex,
  index,
}: TimelineCardProps) => {
  const isOpen = activeIndex === index;
  const handleClick = () => {
    setActiveIndex(isOpen ? null : index);
  };
  
  return (
    <motion.section 
      className="border border-border rounded-lg p-6 bg-muted/30 transition-colors hover:bg-muted/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-4 cursor-pointer select-none group mb-4"
        onClick={handleClick}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary">
          {String(index + 1).padStart(2, '0')}
        </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {timeline.jobTitle}
            </h3>
            <p className="text-sm text-foreground/70 font-medium">
              {timeline.company_name}
            </p>
          </div>
        </div>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span 
            className="bg-primary w-4 h-0.5 absolute transition-transform duration-300" 
            style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)' }} 
          />
          <span className="bg-primary w-4 h-0.5 absolute" />
        </div>
      </div>
      
      {/* Expanded Content */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="space-y-4">
          {/* Summary */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/90 mb-2 tracking-wide">Overview</h4>
            <p className="text-foreground/85 leading-relaxed text-sm">
            {timeline.summary}
          </p>
          </div>
          
          {/* Details */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Location</p>
              <p className="text-sm text-foreground/80">{timeline.jobLocation}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Duration</p>
              <p className="text-sm text-foreground/80">
                {formatDate(timeline.startDate).month} {formatDate(timeline.startDate).year} - {formatDate(timeline.endDate).month} {formatDate(timeline.endDate).year}
              </p>
            </div>
          </div>
          
          {/* Bullet Points */}
          {timeline.bulletPoints && timeline.bulletPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground/90 mb-3 tracking-wide">Key Highlights</h4>
              <div className="space-y-2">
              {timeline.bulletPoints.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/85 leading-relaxed text-sm">
                  {point}
                    </p>
                  </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};
