import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import Skill from './common/Skill';
import Github from './svgs/Github';
import LinkedIn from './svgs/LinkedIn';
import Website from './svgs/Website';
import X from './svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

// Technology Icons
import NextJs from './technologies/NextJs';
import ReactIcon from './technologies/ReactIcon';
import TypeScript from './technologies/TypeScript';
import NodeJs from './technologies/NodeJs';
import TailwindCss from './technologies/TailwindCss';
import MongoDB from './technologies/MongoDB';
import AWS from './technologies/AWS';
import JavaScript from './technologies/JavaScript';

interface ExperienceCardProps {
  experience: Experience;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Company Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
        {/* Left Side */}
        <div className="flex items-start gap-3 sm:gap-4">
          <Image
            src={experience.image}
            alt={experience.company}
            width={100}
            height={100}
            className="size-10 sm:size-12 rounded-md flex-shrink-0"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className={cn(
                    'text-base sm:text-lg font-bold truncate',
                    experience.isBlur ? 'blur-[5px]' : 'blur-none',
                  )}
                >
                  {experience.company}
                </h3>
                {experience.isCurrent && (
                  <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs flex-shrink-0">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                    Working
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {experience.website && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={experience.website}
                        target="_blank"
                        className="size-4 text-neutral-500 hover:text-neutral-700 transition-colors"
                      >
                        <Website />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Visit Website</TooltipContent>
                  </Tooltip>
                )}
                {experience.x && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={experience.x}
                        target="_blank"
                        className="size-4 text-neutral-500 hover:text-neutral-700 transition-colors"
                      >
                        <X />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Follow on X</TooltipContent>
                  </Tooltip>
                )}
                {experience.linkedin && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={experience.linkedin}
                        target="_blank"
                        className="size-4 text-neutral-500 hover:text-neutral-700 transition-colors"
                      >
                        <LinkedIn />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Connect on LinkedIn</TooltipContent>
                  </Tooltip>
                )}
                {experience.github && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={experience.github}
                        target="_blank"
                        className="size-4 text-neutral-500 hover:text-neutral-700 transition-colors"
                      >
                        <Github />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>View GitHub</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
            <p className="text-foreground/90 font-medium text-sm sm:text-base mt-1">{experience.position}</p>
          </div>
        </div>
        {/* Right Side */}
        <div className="text-foreground flex flex-col sm:text-right">
          <p className="text-xs sm:text-sm font-medium">
            {experience.startDate} -{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>
          <p className="text-xs sm:text-sm text-foreground/80">{experience.location}</p>
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-sm sm:text-base mt-3 sm:mt-4 mb-2 font-semibold">Technologies</h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {experience.technologies.map((technology, techIndex: number) => (
            <Skill
              key={techIndex}
              name={technology.name}
              href={technology.href}
            >
              {technology.icon}
            </Skill>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="text-foreground flex flex-col">
        {experience.description.map(
          (description: string, descIndex: number) => (
            <p
              key={descIndex}
              className="text-xs sm:text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: `• ${parseDescription(description)}`,
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}
