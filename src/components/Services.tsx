"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

import { Service } from "../utils/interface";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { HoverImage } from "./ui/HoverImage";

interface ServiceProps {
  services: Service[];
}

function Services({ services }: ServiceProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnyFormOpen, setIsAnyFormOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 10, stiffness: 50 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only update mouse position if no form is open
    if (!isAnyFormOpen) {
      const { clientX, clientY } = e;
      mouseX.set(clientX + 20); // Offset by half the preview width
      mouseY.set(clientY + 20); // Offset by half the preview height
    }
  };

  const handleMouseEnter = (imageUrl: string) => {
    setPreview(imageUrl);
  };

  const handleMouseLeave = () => {
    // Only clear preview if no form is open
    if (!isAnyFormOpen) {
      setPreview(null);
    }
  };

  const handleFormStateChange = (isOpen: boolean) => {
    setIsAnyFormOpen(isOpen);
    if (isOpen) {
      setPreview(null); // Hide preview when form opens
    }
  };

  return (
    <section 
      className="px-2 py-20 relative" 
      id="services"
      onMouseMove={!isAnyFormOpen ? handleMouseMove : undefined}
      onMouseLeave={!isAnyFormOpen ? handleMouseLeave : undefined}
    >
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading className="md:pl-16 overflow-hidden tracking-tighter">
        <SlideIn className="text-white/40">Here&apos;s how</SlideIn> <br />
        <SlideIn>I can help you</SlideIn>
      </SectionHeading>
      <div className="mx-auto pt-10">
        {services.map((service) => (
          <Transition key={service._id}>
            <div
              onMouseEnter={() => !isAnyFormOpen && handleMouseEnter(service.image.url)}
              onMouseLeave={handleMouseLeave}
            >
              <HoverImage
                heading={service.name}
                price={service.charge}
                imgSrc={service.image.url}
                subheading={service.desc}
                onFormStateChange={handleFormStateChange}
              />
            </div>
          </Transition>
        ))}
      </div>
      {/* Floating Preview Image */}
      <AnimatePresence>
        {preview && !isAnyFormOpen && (
          <motion.div
            className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-80 h-56">
              <Image
                src={preview}
                alt="Service preview"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="320px"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default Services;
