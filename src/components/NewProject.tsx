"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Tag {
  id: string;
  name: string;
  path?: string;
}

interface ProjectProps {
  title: string;
  description: string;
  subDescription: string[];
  href?: string;
  image: string;
  tags: Tag[];
  setPreview?: (image: string | null) => void;
}

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}: ProjectProps & { closeModal: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-black/60 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-4xl mx-4 border shadow-xl rounded-2xl bg-background border-neutral-800"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-full top-4 right-4 bg-neutral-800/80 hover:bg-neutral-700 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
        <div className="p-6 md:p-8">
          <h5 className="mb-4 text-2xl font-medium text-white">{title}</h5>
          <p className="mb-4 text-base text-gray-300">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-4 text-base text-gray-300">
              {subDesc}
            </p>
          ))}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6 pt-6 border-t border-neutral-800">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm text-gray-300 bg-neutral-800 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
              >
                View Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}: ProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="group relative py-8 transition-colors hover:bg-neutral-800/30 rounded-xl px-4"
        onMouseEnter={() => setPreview?.(image)}
        onMouseLeave={() => setPreview?.(null)}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-medium text-white">{title}</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-sm text-gray-400"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
          >
            Read More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      
      {isModalOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Project; 
