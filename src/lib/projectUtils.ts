export const getProjectCategory = (techStack: string[]): string => {
  const tech = techStack.map((t) => t.trim().toLowerCase());
  if (tech.includes("reactjs") || tech.includes("nextjs")) return "Web Development";
  if (tech.includes("mern")) return "Full Stack";
  if (tech.includes("flutter")) return "App Development";
  if (tech.includes("solidity") || tech.includes("web3.js") || tech.includes("ethereum")) return "Blockchain";
  if (tech.includes("python") || tech.includes("tensorflow") || tech.includes("openai api")) return "AI/ML";
  if (tech.includes("arduino") || tech.includes("raspberry pi") || tech.includes("mqtt")) return "IoT";
  return "Development";
};

export const getRelatedProjects = (currentProject: any, allProjects: any[], limit: number = 2) => {
  const currentTech = currentProject.techStack.map((t: string) => t.trim().toLowerCase());
  const currentCategory = getProjectCategory(currentProject.techStack);
  
  // Score projects based on similarity
  const scoredProjects = allProjects
    .filter(p => p._id !== currentProject._id)
    .map(p => {
      const projectTech = p.techStack.map((t: string) => t.trim().toLowerCase());
      const projectCategory = getProjectCategory(p.techStack);
      
      let score = 0;
      
      // Category match (highest priority)
      if (projectCategory === currentCategory) {
        score += 10;
      }
      
      // Technology stack overlap
      const techOverlap = currentTech.filter(tech => 
        projectTech.some(pTech => pTech.includes(tech) || tech.includes(pTech))
      ).length;
      score += techOverlap * 3;
      
      // Exact technology matches
      const exactMatches = currentTech.filter(tech => projectTech.includes(tech)).length;
      score += exactMatches * 5;
      
      // Similar project types (based on keywords in title/description)
      const currentKeywords = [
        ...currentProject.title.toLowerCase().split(' '),
        ...(currentProject.description || '').toLowerCase().split(' ')
      ].filter(word => word.length > 3);
      
      const projectKeywords = [
        ...p.title.toLowerCase().split(' '),
        ...(p.description || '').toLowerCase().split(' ')
      ].filter(word => word.length > 3);
      
      const keywordOverlap = currentKeywords.filter(keyword => 
        projectKeywords.some(pKeyword => pKeyword.includes(keyword) || keyword.includes(pKeyword))
      ).length;
      score += keywordOverlap * 2;
      
      // Project complexity similarity (based on timeline)
      if (currentProject.timeline && p.timeline) {
        const currentTimeline = currentProject.timeline.toLowerCase();
        const projectTimeline = p.timeline.toLowerCase();
        if (currentTimeline === projectTimeline) {
          score += 2;
        }
      }
      
      // Team size similarity
      if (currentProject.team && p.team) {
        const currentTeam = currentProject.team.toLowerCase();
        const projectTeam = p.team.toLowerCase();
        if (currentTeam === projectTeam) {
          score += 1;
        }
      }
      
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  // If we don't have enough related projects, fill with random ones
  if (scoredProjects.length < limit) {
    const remainingProjects = allProjects
      .filter(p => p._id !== currentProject._id && !scoredProjects.some(sp => sp._id === p._id))
      .slice(0, limit - scoredProjects.length);
    scoredProjects.push(...remainingProjects);
  }
  
  return scoredProjects;
};

export const getSimilarityLabel = (score: number) => {
  if (score >= 15) return { 
    label: "Highly Related", 
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    description: "Shares category and multiple technologies"
  };
  if (score >= 8) return { 
    label: "Related", 
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    description: "Shares category or key technologies"
  };
  if (score >= 3) return { 
    label: "Somewhat Related", 
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    description: "Shares some technologies or keywords"
  };
  return { 
    label: "Suggested", 
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    description: "Recommended based on portfolio"
  };
};
