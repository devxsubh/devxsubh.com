'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Transition,
  Variant,
} from 'framer-motion';
import { cn } from '@/utils/cn';

interface CursorProps {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
}

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  );
  const cursorY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  );
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  const attachToParentCallback = useCallback((cursor: HTMLDivElement) => {
    const parent = document.body;
    if (parent && !parent.contains(cursor)) {
      parent.appendChild(cursor);
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (!attachToParent) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', updatePosition);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      if (cursor && cursor.parentElement) {
        cursor.parentElement.removeChild(cursor);
      }
    };
  }, [cursorX, cursorY, onPositionChange, attachToParent]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !attachToParent) return;

    const parent = cursor.parentElement;
    if (!parent) return;

    const handleVisibilityChange = (visible: boolean) => {
      setIsVisible(visible);
    };

    const handleMouseEnter = () => {
      parent.style.cursor = 'none';
      handleVisibilityChange(true);
    };

    const handleMouseLeave = () => {
      parent.style.cursor = 'auto';
      handleVisibilityChange(false);
    };

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [attachToParent]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      attachToParentCallback(cursor);
    }
    return () => {
      if (cursor && cursor.parentElement) {
        cursor.parentElement.removeChild(cursor);
      }
    };
  }, [attachToParentCallback]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  return (
    <motion.div
      ref={cursorRef}
      className={cn('pointer-events-none fixed left-0 top-0 z-50', className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
