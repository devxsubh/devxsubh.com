"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

interface GSAPPageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function GSAPStaircaseTransition({ children, className = "" }: GSAPPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if this is the initial page load (refresh)
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      // On refresh, just show content without transition
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    // Check if loading animation is active
    const loader = document.querySelector('.loader-wrapper, .loading-animation, [data-loading="true"]');
    if (loader) {
      // If loading is active, just show content without transition
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    
    // Reset bars to initial state
    gsap.set('.transition-bar', { scaleY: 0 });
    
    // Reset container to initial state
    gsap.set(container, { opacity: 0, y: 50 });
    
    // Staircase transition bars
    const bars = document.querySelectorAll('.transition-bar');
    
    // Page transition effect
    tl.to(bars, {
      duration: 0.3,
      scaleY: 1,
      transformOrigin: "bottom left",
      stagger: 0.1,
      ease: "power2.inOut"
    })
    .to(bars, {
      duration: 0.3,
      scaleY: 0,
      transformOrigin: "bottom left",
      stagger: 0.05,
      delay: 0.05,
      ease: "power2.inOut"
    })
    .to(container, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      {/* Transition bars */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="transition-bar absolute top-0 w-full h-full bg-white"
            style={{
              left: `${i * 12.5}%`,
              width: '12.5%',
              transform: 'scaleY(0)',
              transformOrigin: 'bottom left'
            }}
          />
        ))}
      </div>
      
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </>
  );
}
