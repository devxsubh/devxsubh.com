"use client";

import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

import { cn } from "../utils/cn";
import { Project } from "../utils/interface";
import { Transition } from "./ui/Transitions";
import { TextReveal } from "./ui/Typography";

interface FilterProps {
  projects: Project[];
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

const Filters = ({ projects, filterValue, setFilterValue }: FilterProps) => {
  // Helper function to determine project category based on tech stack
  const getProjectCategory = (techStack: string[]) => {
    const tech = techStack.map((t) => t.trim().toLowerCase())
    if (tech.includes("reactjs") || tech.includes("nextjs")) return "Web Development"
    if (tech.includes("mern")) return "Full Stack"
    if (tech.includes("flutter")) return "App Development"
    if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return "Blockchain"
    if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return "AI/ML"
    if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return "IoT"
    return "Development"
  }

  // Get unique project categories
  const categories = projects.map(project => getProjectCategory(project.techStack));
  const filters = Array.from(new Set(categories));

  return (
    <div className="flex items-center gap-2 md:gap-4 py-6 md:py-8 justify-center flex-wrap px-2 md:px-0">
      <Transition viewport={{ once: true }}>
        <button
          className={cn(
            "border border-white/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full relative text-sm md:text-base whitespace-nowrap",
            filterValue === "all" && "text-black border-transparent"
          )}
          onClick={() => setFilterValue("all")}
        >
          {filterValue === "all" && (
            <motion.span
              transition={{ type: "spring", bounce: 0.3 }}
              exit={{ type: "spring" }}
              layoutId="active-filter"
              className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
            />
          )}
          <TextReveal>All</TextReveal>
        </button>
      </Transition>
      {filters.map((filter, index) => (
        <Transition
          key={index}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setFilterValue(filter)}
            animate={{ color: filterValue === filter ? "black" : "" }}
            transition={{ delay: 0.4 }}
            className="relative border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm whitespace-nowrap"
          >
            {filterValue === filter && (
              <motion.span
                transition={{ type: "spring", bounce: 0.3 }}
                exit={{ type: "spring" }}
                layoutId="active-filter"
                className="absolute top-0 left-0 w-full h-full bg-primary -z-10 rounded-full"
              />
            )}
            <TextReveal>{filter}</TextReveal>
          </motion.button>
        </Transition>
      ))}
    </div>
  );
};

export default Filters;
