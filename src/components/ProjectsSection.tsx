"use client";

import React, { useState, useCallback } from "react";
import Project from "./NewProject";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "1",
    title: "Tag Heuer - Carrera 60",
    description: "A groundbreaking digital out-of-home campaign that redefined luxury watch marketing through innovative motion design and immersive storytelling.",
    subDescription: [
      "Created a series of dynamic motion graphics that captured the essence of the Carrera&apos;s racing heritage while maintaining the brand&apos;s luxury appeal.",
      "Developed a unique visual language that seamlessly integrated traditional watchmaking elements with modern digital aesthetics.",
      "Implemented the campaign across multiple high-end retail locations, creating an engaging and memorable brand experience."
    ],
    image: "/images/personal/img_8218.webp",
    tags: [
      { id: "1", name: "Motion Design" },
      { id: "2", name: "DOOH" },
      { id: "3", name: "2023" }
    ],
    href: "#"
  },
  {
    id: "2",
    title: "Cartier - Time Unlimited",
    description: "An immersive exhibition experience that brought Cartier&apos;s timeless elegance to life through innovative motion design and video mapping.",
    subDescription: [
      "Designed and executed a series of large-scale video mappings that transformed the exhibition space into a dynamic storytelling canvas.",
      "Created custom motion graphics that highlighted the intricate details of Cartier&apos;s iconic timepieces.",
      "Developed an interactive timeline that allowed visitors to explore the brand&apos;s rich heritage through engaging visual narratives."
    ],
    image: "/images/gallery/1716881877478.webp",
    tags: [
      { id: "1", name: "Motion Design" },
      { id: "2", name: "Videomapping" },
      { id: "3", name: "2022" }
    ],
    href: "#"
  },
  {
    id: "3",
    title: "Hublot - Innovation in Motion",
    description: "A cutting-edge motion design project that showcased Hublot&apos;s innovative spirit through dynamic visual storytelling and scenography.",
    subDescription: [
      "Created a series of high-impact motion graphics that highlighted Hublot&apos;s innovative materials and manufacturing processes.",
      "Designed an immersive scenographic experience that brought the brand&apos;s technical excellence to life.",
      "Developed a cohesive visual language that maintained luxury appeal while emphasizing technological innovation."
    ],
    image: "/images/gallery/1690621540493.webp",
    tags: [
      { id: "1", name: "Motion Design" },
      { id: "2", name: "Scenography" },
      { id: "3", name: "2023" }
    ],
    href: "#"
  }
];

export default function ProjectsSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  }, [x, y]);
  
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-24 px-4 md:px-16 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[4vw] md:text-[5vw] font-medium leading-none mb-12 text-white">
          My Selected Projects
        </h2>
        
        <div className="h-[1px] w-full mb-12 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        
        <div className="space-y-2">
          {projects.map((project) => (
            <Project
              key={project.id}
              {...project}
              setPreview={setPreview}
            />
          ))}
        </div>

        {preview && (
          <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none"
            style={{ x: springX, y: springY }}
          >
            <div className="relative w-80 h-56">
              <Image
                src={preview}
                alt="Project preview"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="320px"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
} 