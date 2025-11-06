'use client'

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./ui/Typography";
import { SlideIn } from "./ui/Transitions";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/images/tag-heuer.jpg",
    title: "Singapore Trip",
    subtitle: "Tech Explosion · 2024",
  },
  {
    image: "/images/gallery/1716881877478.webp",
    title: "Ankur Warikoo",
    subtitle: "Startup, Delhi · 2024",
  },
  {
    image: "/images/personal/img_20240422.webp",
    title: "Neutron 1.0",
    subtitle: "Tech Festival, Delhi · 2024",
  },
  {
    image: "/images/gallery/1690621540493.webp",
    title: "IIT Kharagpur",
    subtitle: "Intership, Kharagpur · 2023",
  },
  {
    image: "/images/personal/773d75a4.webp",
    title: "Workation",
    subtitle: "Travel & Networking, Himachal · 2024",
  },
];

const carouselImages = [
  "/images/personal/img_8218.webp",
  "/images/personal/dsc_3304.webp",
  "/images/personal/img_8308.webp",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % carouselImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setCarouselIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray(".work-card");
    gsap.set(cards, { opacity: 0, y: 60 });

    const animations = cards.map((card: any, i: number) => {
      return gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: i * 0.1,
      });
    });

    return () => {
      animations.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 md:px-16 relative">
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading>
        <SlideIn className="text-white/40">Moments</SlideIn>
        <br />
        <SlideIn>Gallery</SlideIn>
        {/* <br />
        <SlideIn>works</SlideIn> */}
      </SectionHeading>
      <div ref={sectionRef} className="flex flex-col gap-16">
        {/* First row */}
        <div className="flex flex-col md:flex-row gap-16">
          <div className="work-card flex-1 relative h-64 md:h-[35rem]">
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={carouselImages[carouselIndex]}
                    alt={`Subham Mahapatra portfolio project showcase ${carouselIndex + 1} - Professional web development and design work`}
                    fill
                    className="object-cover rounded-lg shadow-lg border border-neutral-800 transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Carousel Controls */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white shadow-lg rounded-full p-2 md:p-3 hover:bg-primary hover:text-black transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white shadow-lg rounded-full p-2 md:p-3 hover:bg-primary hover:text-black transition-colors"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="mt-2 md:mt-4">
              <div className="font-medium text-base md:text-lg text-white">{projects[0].title}</div>
              <div className="text-xs md:text-sm text-gray-400">{projects[0].subtitle}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <p className="text-gray-300 text-base md:text-lg mb-8 work-card">
            We believe creativity is limitless. This gallery is a celebration of moments, light, and emotion—where every photograph tells a story beyond the frame. More than just images, it&apos;s a visual journey crafted to inspire, provoke, and connect. Welcome to an experience where art meets soul.
            </p>
            <div className="work-card mt-12 h-[28rem] relative">
              <div className="relative w-full h-full">
              <Image
                src={projects[1].image}
                alt={projects[1].title}
                fill
                className="object-cover rounded-lg shadow-lg border border-neutral-800 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              </div>
              <div className="mt-4">
                <div className="font-medium text-lg text-white">{projects[1].title}</div>
                <div className="text-sm text-gray-400">{projects[1].subtitle}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Second row, centered */}
        <div className="flex justify-center mt-12">
          <div className="work-card max-w-2xl w-full relative aspect-video">
            <div className="relative w-full h-full">
            <Image
              src={projects[2].image}
              alt={projects[2].title}
              fill
              className="object-cover rounded-lg shadow-lg border border-neutral-800"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            </div>
            <div className="mt-4">
              <div className="font-medium text-lg text-white">{projects[2].title}</div>
              <div className="text-sm text-gray-400">{projects[2].subtitle}</div>
            </div>
          </div>
        </div>
        {/* Additional projects in a grid - same layout as first row */}
        <div className="flex flex-col md:flex-row gap-16 mt-12">
          <div className="work-card flex-1 relative h-64 md:h-auto md:aspect-video">
            <div className="relative w-full h-full">
              <Image
                src={projects[3].image}
                alt={projects[3].title}
                fill
                className="object-cover rounded-lg shadow-lg border border-neutral-800"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="mt-4">
              <div className="font-medium text-lg text-white">{projects[3].title}</div>
              <div className="text-sm text-gray-400">{projects[3].subtitle}</div>
            </div>
          </div>
          <div className="work-card flex-1 relative h-64 md:h-auto md:aspect-video">
            <div className="relative w-full h-full">
              <Image
                src={projects[4].image}
                alt={projects[4].title}
                fill
                className="object-cover rounded-lg shadow-lg border border-neutral-800"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="mt-4">
              <div className="font-medium text-lg text-white">{projects[4].title}</div>
              <div className="text-sm text-gray-400">{projects[4].subtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}