"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { About as IAbout, Timeline } from "../utils/interface";
import { OpacityTextReveal, SlideIn, Transition } from "./ui/Transitions";
import { formatDate } from "../utils";
import { Tilt } from "./ui/tilt";

interface AboutProps {
  about: IAbout;
  timeline: Timeline[];
}

const About = ({ about, timeline }: AboutProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <section
      id="about"
      className="relative z-2 bg-background overflow-hidden "
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="relative z-1 grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-20 px-4 md:px-8">
        <div>
          <h3 className="md:text-4xl text-2xl font-bold overflow-hidden uppercase pb-8">
            <SlideIn>
              <OpacityTextReveal>{about.quote}</OpacityTextReveal>
            </SlideIn>
          </h3>
          <Transition
            viewport={{ once: true }}
            className="md:text-3xl tracking-tighter"
          >
            <OpacityTextReveal>
              {about.description.split('\n\n').map((paragraph, index) => (
                <span key={index}>
                  {paragraph}
                  {index < about.description.split('\n\n').length - 1 && (
                    <>
                      <br />
                    </>
                  )}
                </span>
              ))}
            </OpacityTextReveal>
          </Transition>
          <div className="pt-10">
            <div className="py-10 overflow-hidden grid w-full">
              {education.map((edu, index) => (
                <Transition key={edu._id}>
                  <TimelineCard
                    index={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    timeline={edu}
                  />
                </Transition>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="sticky top-6">
            <Transition>
              <div className="relative w-fit mx-auto">
              <Tilt
                rotationFactor={6}
                isRevese
                style={{
                  transformOrigin: 'center center',
                }}
                springOptions={{
                  stiffness: 26.7,
                  damping: 4.1,
                  mass: 0.2,
                }}
                className='group relative rounded-lg'
              >
                <Image
                  src={about.avatar.url}
                  width={400}
                  height={400}
                  alt={about.name}
                  className="rounded-xl h-64 sm:h-80 md:h-[35rem] lg:h-[40rem] max-md:aspect-square object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
                </Tilt>
                <div className="absolute bottom-4 right-4 max-md:bottom-2 max-md:right-2 z-10">
                  <div className="relative w-32 h-32 animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <path
                          id="circle"
                          d="M 50, 50
                            m -40, 0
                            a 40,40 0 1,1 80,0
                            a 40,40 0 1,1 -80,0"
                        />
                      </defs>
                      <text fill="#fff" fontSize="10" fontFamily="sans-serif">
                        <textPath xlinkHref="#circle" startOffset="0%">
                          • LET&apos;S TALK • LET&apos;S TALK • LET&apos;S TALK • LET&apos;S TALK •
                        </textPath>
                      </text>
                    </svg>
                    <Link href="/#contact" scroll={true} aria-label="Let's Talk">
                      <button
                        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/80 flex items-center justify-center text-white text-2xl hover:bg-black transition"
                        tabIndex={0}
                        type="button"
                      >
                        <span>→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

interface TimelineCardProps {
  timeline: Timeline;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  index: number;
}

const TimelineCard = ({
  timeline,
  activeIndex,
  setActiveIndex,
  index,
}: TimelineCardProps) => {
  const isOpen = activeIndex === index;
  const handleClick = () => {
    setActiveIndex(isOpen ? null : index);
  };
  return (
    <motion.section 
      className="border-b border-primary/20 py-4 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="flex items-center justify-between gap-4 cursor-pointer select-none group"
        onClick={handleClick}
      >
        <span className="text-sm sm:text-base md:text-lg text-foreground/60 group-hover:text-foreground transition-colors">0{index + 1}</span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold flex-1 group-hover:text-primary transition-colors">
          {timeline.jobTitle}
        </span>
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          <span className="bg-primary w-3 sm:w-4 md:w-6 h-0.5 absolute transition-transform duration-300" 
            style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)' }} 
          />
          <span className="bg-primary w-3 sm:w-4 md:w-6 h-0.5 absolute" />
        </div>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-4">
          <p className="text-sm sm:text-base md:text-lg text-foreground/60 py-2 leading-relaxed">
            {timeline.summary}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 pb-3 text-foreground/80">
            <div className="text-sm sm:text-base space-x-2">
              <span className="font-medium">{timeline.company_name}</span>
              <span className="text-foreground/60">•</span>
              <span>{timeline.jobLocation}</span>
            </div>
            <div className="text-xs sm:text-sm text-foreground/60">
              <span className="italic">
                {formatDate(timeline.startDate).month +
                  ", " +
                  formatDate(timeline.startDate).year}
              </span>
              {" - "}
              <span className="italic">
                {formatDate(timeline.endDate).month +
                  ", " +
                  formatDate(timeline.endDate).year}
              </span>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {timeline.bulletPoints.map((point, index) => (
              <li key={index} className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
};
