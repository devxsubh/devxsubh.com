'use client';

// Import specific components from framer-motion
import { motion as _motion } from 'framer-motion';
import { AnimatePresence as _AnimatePresence } from 'framer-motion';
import { useSpring as _useSpring } from 'framer-motion';
import { useMotionValue as _useMotionValue } from 'framer-motion';

// Re-export as named exports
export const motion = _motion;
export const AnimatePresence = _AnimatePresence;
export const useSpring = _useSpring;
export const useMotionValue = _useMotionValue; 