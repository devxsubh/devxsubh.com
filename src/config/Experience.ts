export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies: Technology[];
  image: string;
  website?: string;
  x?: string;
  linkedin?: string;
  github?: string;
  isCurrent?: boolean;
  isBlur?: boolean;
}

export interface Technology {
  name: string;
  href?: string;
  icon: React.ReactNode;
}

// Sample experience data - you can replace this with your actual data
export const experiences: Experience[] = [
  {
    company: "Brahmastra Aerospace & Defence Pvt. Ltd.",
    position: "Entrepreneur-in-Residence",
    startDate: "Apr 2023",
    endDate: "Jun 2023",
    location: "Remote",
    description: [
      "Served as Entrepreneur-in-Residence, focusing on innovative solutions in aerospace and defense technology.",
      "Worked on cutting-edge projects in the aerospace sector.",
      "Collaborated with cross-functional teams to deliver high-impact solutions."
    ],
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "Python", icon: "🐍" },
      { name: "Aerospace", icon: "🚀" }
    ],
    image: "/images/projects/Project (1).webp",
    isCurrent: false,
    isBlur: false
  }
];
