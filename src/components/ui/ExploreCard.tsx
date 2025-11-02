"use client"

import { motion } from "framer-motion"
import { fadeIn } from "../../utils/motion"
import Image from "next/image"
import { useState } from "react"

interface ExploreCardProps {
  id: string
  imgUrl: string
  title: string
  index: number
}

const ExploreCard = ({ id, imgUrl, title, index }: ExploreCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTouchStart = () => {
    setIsExpanded(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => setIsExpanded(false), 100)
  }

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      initial="hidden"
      animate="show"
      className={`
  group relative flex items-center justify-center overflow-hidden
  // Mobile-only improvements
  w-full h-[230px] min-w-[320px] rounded-[12px] cursor-pointer
  // Small mobile optimization
  xs:h-[230px] xs:min-w-[300px]
  // Tablet - start transitioning to desktop behavior
  sm:w-[80%] sm:h-[350px] sm:min-w-[320px]
  // Desktop - preserve original behavior
  md:w-[50%] md:h-[400px] md:min-w-[170px] md:rounded-[10px]
  lg:w-[30%] lg:h-[550px] lg:hover:w-[80%]
  // Smooth transitions
  transition-all duration-700 ease-out
  // Mobile touch expansion (only on mobile)
  ${isExpanded ? "md:scale-100 scale-[1.02] shadow-lg" : ""}
`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // Prevent touch callout on mobile
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
      }}
    >
      <Image
        src={imgUrl || "/placeholder.svg"}
        alt={title}
        fill
        className={`
   object-cover object-top transition-all duration-700
   // Mobile - black and white state
   grayscale brightness-75 scale-100
   // Desktop - preserve original behavior  
   md:grayscale md:brightness-75
   // Desktop hover - unchanged
   group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100
   // Mobile touch state - more subtle
   ${isExpanded ? "md:grayscale-0 md:scale-105 md:brightness-100 grayscale-0 scale-[1.02] brightness-100" : ""}
 `}
        style={{ zIndex: 0 }}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
        priority={index < 3}
      />

      {/* Gradient overlay */}
      <div
        className={`
  absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent
  transition-opacity duration-500
  // Mobile - always slightly visible for better text readability
  opacity-20
  // Desktop - preserve original behavior
  md:opacity-0 md:group-hover:opacity-100
  // Mobile touch state
  ${isExpanded ? "opacity-100" : ""}
`}
      />

      {/* Default title - visible when not hovered/expanded */}
      <h3
        className={`
  absolute z-10 font-semibold text-white
  transition-opacity duration-300
  // Mobile positioning and sizing
  bottom-4 left-4 text-lg leading-tight max-w-[80%]
  // Tablet
  sm:bottom-6 sm:left-6 sm:text-xl
  // Desktop - preserve original positioning
  md:bottom-8 md:left-8 md:text-[22px]
  lg:text-[26px]
  // Hide on interaction
  group-hover:opacity-0
  ${isExpanded ? "opacity-0" : ""}
`}
      >
        {title}
      </h3>

      {/* Expanded content */}
      <motion.div
        className={`
  absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-start w-full
  transition-all duration-500
  // Mobile padding
  p-4
  // Tablet padding  
  sm:p-6
  // Desktop padding - preserve original
  md:p-6 lg:p-8
  // Mobile - show on touch, desktop - show on hover
  opacity-0 group-hover:opacity-100
  ${isExpanded ? "opacity-100" : ""}
`}
      >
        {/* Journey indicator */}
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-white/80 text-xs font-medium tracking-wider uppercase">My Journey</span>
        </div>

        {/* Main title */}
        <h2 className="font-bold text-white mb-3 text-xl sm:text-2xl md:text-[28px] lg:text-[32px] leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="md:block hidden text-white/70 text-sm leading-relaxed mb-4 max-w-[90%] sm:max-w-[280px] md:text-sm">
          A glimpse into my world, where each moment tells a unique story of passion and creativity.
        </p>
      </motion.div>

      {/* Mobile touch indicator */}
      <div
        className={`
    absolute top-4 right-4 z-30 
    w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm
    flex items-center justify-center
    transition-all duration-300
    // Only show on mobile when expanded
    ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-75"}
    // Hide on desktop
    md:hidden
  `}
      >
        <span className="text-white text-xs">✨</span>
      </div>
    </motion.div>
  )
}

export default ExploreCard
