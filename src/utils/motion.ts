import { Variants } from "framer-motion";

export const fadeIn = (direction: string, type: "spring" | "tween" | "keyframes" | "inertia", delay: number, duration: number): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}); 