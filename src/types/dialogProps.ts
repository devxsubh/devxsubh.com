import type { Project } from "@/utils/interface"
 
export interface DialogProps {
  selectedProject: Project
  setSelectedProject: ((project: Project | null) => void) | (() => void)
} 