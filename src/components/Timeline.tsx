"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

import type { Timeline as ITimeline } from "../utils/interface"
import { SectionHeading } from "./ui/Typography"
import { SlideIn, Transition } from "./ui/Transitions"
import { formatDate } from "../utils"

interface ExperienceProps {
  timeline: ITimeline[]
}

const Timeline = ({ timeline }: ExperienceProps) => {
  const experience = timeline
    .filter((line) => !line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence)

  const [hover, setHover] = useState<number | null>(null)
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  const handleItemClick = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return (
    <div className="relative pb-20">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <SectionHeading className="px-4 md:px-12 py-12 md:py-20">
        <SlideIn className="text-white/40">Experience</SlideIn>
        <br />
        <SlideIn>History</SlideIn>
      </SectionHeading>

      <div className="relative">
        {experience.map((exp, index) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="relative"
          >
            <Transition
              className="py-4 md:py-8 border-b border-white/10 px-4 md:px-8 lg:px-12 cursor-pointer"
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleItemClick(index)}
            >
              <motion.div className="relative" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 md:gap-8"
                  animate={{
                    scale: hover === index ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    className="max-md:hidden text-white/40 font-mono"
                    animate={{
                      color: hover === index ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    0{index + 1}
                  </motion.span>

                  <motion.div
                    className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium md:font-semibold flex-1"
                    animate={{
                      color: hover === index ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)",
                    }}
                  >
                    {exp.jobTitle}
                  </motion.div>

                  <div className="text-xs sm:text-sm md:text-base text-foreground/50 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <motion.span
                      className="italic"
                      animate={{
                        color: hover === index ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {formatDate(exp.startDate).month + ", " + formatDate(exp.startDate).year}
                    </motion.span>
                    <span className="hidden sm:inline">{" - "}</span>
                    <motion.span
                      className="italic"
                      animate={{
                        color: hover === index ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {exp.endDate ? formatDate(exp.endDate).month + ", " + formatDate(exp.endDate).year : "Present"}
                    </motion.span>
                  </div>
                </motion.div>

                <motion.div
                  className="pl-0 sm:pl-4 md:pl-12 py-2 text-foreground/50 text-xs sm:text-sm md:text-base flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0"
                  animate={{
                    color: hover === index ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span className="font-medium">{exp.company_name}</span>
                  <span className="text-foreground/40">{exp.jobLocation}</span>
                </motion.div>

                {/* Expand/Collapse indicator */}
                {/* <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  animate={{
                    rotate: expandedItem === index ? 180 : 0,
                    opacity: hover === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 10.5L4 6.5h8L8 10.5z" />
                  </svg>
                </motion.div> */}
              </motion.div>

              <AnimatePresence>
                {(hover === index || expandedItem === index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="pt-4"
                    >
                      <motion.p
                        className="text-foreground/60 py-2 pl-0 sm:pl-4 md:pl-12 text-sm sm:text-base leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {exp.summary}
                      </motion.p>

                      <motion.ul
                        className="list-disc list-inside pl-0 sm:pl-4 md:pl-12 space-y-2 sm:space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {exp.bulletPoints.map((point, pointIndex) => (
                          <motion.li
                            key={pointIndex}
                            className="text-foreground/80 text-sm sm:text-base leading-relaxed"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.4 + pointIndex * 0.1,
                              duration: 0.3,
                            }}
                          >
                            {point}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Transition>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
