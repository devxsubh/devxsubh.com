"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { About } from "../utils/interface"
import Link from "next/link"
import { ArrowRight, Play, Pause } from "lucide-react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextReveal } from "./ui/Typography"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  about: About
}

export default function EnhancedHero({ about }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  // Framer Motion scroll hooks for smooth parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"])
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"])
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.6, 0.8])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true)
  }, [])

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  useGSAP(() => {
    if (!isLoaded) return

    // Enhanced entrance animations
    const tl = gsap.timeline({ delay: 0.2 })

    // Animate subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
    )

    // Animate title words individually
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".word")
      tl.fromTo(
        words,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )
    }

    // Animate description
    tl.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3",
    )

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress

        // Dynamic blur effect on video
        if (bgRef.current) {
          const blur = progress * 3
          bgRef.current.style.filter = `blur(${blur}px) brightness(${1 - progress * 0.3})`
        }

        // Parallax text effects
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            y: progress * -100,
            opacity: 1 - progress * 0.5,
          })
        }
      },
    })

    // Magnetic effect for CTA button
    const button = document.querySelector(".cta-button")
    if (button) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        })
      }

      button.addEventListener("mousemove", handleMouseMove)
      button.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        button.removeEventListener("mousemove", handleMouseMove)
        button.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isLoaded])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden hero-section"
      role="banner"
      aria-label="Hero section"
    >
      {/* Enhanced background with parallax */}
      <motion.div ref={bgRef} style={{ y: backgroundY }} className="absolute inset-0 z-0 scale-110">
        <video
          ref={videoRef}
          src="/videos/web/monks-sizzler-web.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={handleVideoLoad}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Background video"
        />

        {/* Fallback image */}
        {!videoLoaded && <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />}

        {/* Dynamic overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
        />

        {/* Animated grain overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] animate-pulse" />
        </div>
      </motion.div>

      {/* Video controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={togglePlayPause}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <span className="text-white text-xs font-medium">{isMuted ? "🔇" : "🔊"}</span>
        </button>
      </div>

      {/* Enhanced content */}
      <motion.div
        ref={contentRef}
        style={{ y: contentY }}
        className="relative h-screen w-full flex flex-col justify-between z-10"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left content with enhanced animations */}
          <div className="w-full lg:w-3/5 h-full flex flex-col justify-end p-6 md:p-12 lg:p-16">
            <motion.p
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl mb-6 text-white/90 font-light tracking-wide"
            >
              Hi, I&apos;m <span className="font-medium text-white">{about.name}</span>
              <br />
              <span className="text-white/70">{about.title}</span>
            </motion.p>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.85] text-white mb-8"
            >
              <span className="word block overflow-hidden">
                <span className="inline-block">Crafting</span>
              </span>
              <span className="word block overflow-hidden">
                <span className="inline-block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Digital
                </span>
              </span>
              <span className="word block overflow-hidden">
                <span className="inline-block">Experiences</span>
              </span>
            </h1>

            {/* Enhanced stats or highlights */}
            <motion.div
              className="flex gap-8 text-white/60 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div>
                <div className="text-2xl font-bold text-white">5+</div>
                <div>Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div>Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div>Client Satisfaction</div>
              </div>
            </motion.div>
          </div>

          {/* Right content with compact design */}
          <div className="w-full lg:w-2/5 h-full flex items-end justify-end">
            <motion.div ref={descriptionRef} className="p-6 md:p-8 lg:p-12 max-w-md">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-sm md:text-base mb-6 text-white/90 leading-relaxed">
                  Software developer with 5 years&apos; experience, helping businesses grow by building
                  <span className="text-white font-medium"> scalable, user-friendly apps</span> that drive results.
                </p>

                <div className="space-y-4">
                  <Link
                    href="#contact"
                    className="cta-button inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-300 group font-medium w-full text-sm"
                  >
                    <TextReveal>Let&apos;s Connect</TextReveal>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {/* Compact Social Links */}
                  {about.socialLinks && (
                    <div className="space-y-3">
                      <p className="text-white/60 text-xs font-medium tracking-wider uppercase">Connect</p>
                      <div className="flex flex-wrap gap-2">
                        {about.socialLinks.linkedin && (
                          <motion.a
                            href={about.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="LinkedIn Profile"
                          >
                            <div className="w-5 h-5 rounded bg-[#0077B5] flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">LinkedIn</span>
                          </motion.a>
                        )}

                        {about.socialLinks.github && (
                          <motion.a
                            href={about.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="GitHub Profile"
                          >
                            <div className="w-5 h-5 rounded bg-[#181717] flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">GitHub</span>
                          </motion.a>
                        )}

                        {about.socialLinks.x && (
                          <motion.a
                            href={about.socialLinks.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="X (Twitter) Profile"
                          >
                            <div className="w-5 h-5 rounded bg-[#000000] flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">X</span>
                          </motion.a>
                        )}

                        {about.socialLinks.leetcode && (
                          <motion.a
                            href={about.socialLinks.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="LeetCode Profile"
                          >
                            <div className="w-5 h-5 rounded bg-[#FFA116] flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">LeetCode</span>
                          </motion.a>
                        )}

                        {about.socialLinks.codeforces && (
                          <motion.a
                            href={about.socialLinks.codeforces}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Codeforces Profile"
                          >
                            <div className="w-5 h-5 rounded bg-[#1F8ACB] flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5S3 20.328 3 19.5V9c0-.828.672-1.5 1.5-1.5zm15 0c.828 0 1.5.672 1.5 1.5v10.5c0 .828-.672 1.5-1.5 1.5S18 20.328 18 19.5V9c0-.828.672-1.5 1.5-1.5zM12 3c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-15C10.5 3.672 11.172 3 12 3z" />
                              </svg>
                            </div>
                            <span className="text-white text-xs font-medium">Codeforces</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <motion.div
              className="w-px h-12 bg-white/30"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
