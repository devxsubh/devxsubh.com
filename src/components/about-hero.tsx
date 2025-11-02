"use client"

import { AnimatedTestimonialGrid } from '@/components/ui/testimonial-2';
import { About } from "@/utils/interface";

interface AboutHeroProps {
  about: About;
}

export const AboutHero = ({ about }: AboutHeroProps) => {
  // Safety check for about prop
  if (!about) {
    return (
      <div className="w-full bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  // Your personal images for the animated grid
  const personalImages = [
    { imgSrc: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp', alt: 'Subham Mahapatra - Professional Photo' },
    { imgSrc: '/images/personal/dsc_3038.webp', alt: 'Subham Mahapatra - Portrait' },
    { imgSrc: '/images/personal/dsc_3304.webp', alt: 'Subham Mahapatra - Professional Headshot' },
    { imgSrc: '/images/personal/773d75a4.webp', alt: 'Subham Mahapatra - Casual Photo' },
    { imgSrc: '/images/personal/f41ebe11.webp', alt: 'Subham Mahapatra - Lifestyle Photo' },
    { imgSrc: '/images/personal/img_20240422.webp', alt: 'Subham Mahapatra - Recent Photo' },
    { imgSrc: '/images/personal/img_5430.webp', alt: 'Subham Mahapatra - Portrait' },
    { imgSrc: '/images/personal/img_8218.webp', alt: 'Subham Mahapatra - Professional' },
    { imgSrc: '/images/personal/img_8308.webp', alt: 'Subham Mahapatra - Headshot' },
    { imgSrc: '/images/personal/img_9999.webp', alt: 'Subham Mahapatra - Casual' },
    { imgSrc: '/images/gallery/1716881877478.webp', alt: 'Subham Mahapatra - Candid Shot' },
    { imgSrc: '/images/personal/sssmc_33.webp', alt: 'Subham Mahapatra - Event Photo' },
    { imgSrc: '/images/personal/1758977630929.webp', alt: 'Subham Mahapatra - Recent Portrait' }
  ];

  return (
    <div className="w-full bg-background">
      <AnimatedTestimonialGrid
        testimonials={personalImages}
        badgeText="About Me"
        title={
          <>
            Hi, I&apos;m <span className="text-primary">{about.name}</span>
            <br />
            <span className="text-2xl md:text-3xl font-normal text-muted-foreground">
              {about.title}
            </span>
          </>
        }
        description={
          <>
            {about.subTitle}
            {/* <br /> */}
            {/* <span className="text-muted-foreground/80">
              {about.description.split('\n\n')[0]}
            </span> */}
          </>
        }
        ctaText="View My Work"
        ctaHref="/projects"
        className="min-h-screen"
      />
    </div>
  );
};