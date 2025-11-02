interface PortfolioData {
  about: {
    name: string;
    title: string;
    subTitle: string;
    description: string;
    contactEmail: string;
    socialLinks: {
      linkedin: string;
      github: string;
      instagram: string;
      x: string;
      leetcode: string;
      codeforces: string;
    };
  };
  skills: Array<{
    name: string;
    percentage: number;
    enabled: boolean;
  }>;
  timeline: Array<{
    company_name: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    summary: string;
    bulletPoints: string[];
    forEducation: boolean;
    enabled: boolean;
  }>;
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    liveurl: string;
    githuburl: string;
    enabled: boolean;
    timeline: string;
    role: string;
    team: string;
    status: string;
    overview: string;
    keyFeatures: string[];
    challenges: string[];
    learnings: string[];
    impact: string[];
  }>;
  services: Array<{
    name: string;
    charge: string;
    desc: string;
    enabled: boolean;
  }>;
}

export function generateSystemPrompt(data: PortfolioData): string {
  const { about, skills, timeline, projects, services } = data;

  // Filter enabled skills and sort by percentage
  const enabledSkills = skills
    .filter(skill => skill.enabled)
    .sort((a, b) => b.percentage - a.percentage)
    .map(skill => skill.name);

  // Filter enabled work experiences (non-education)
  const workExperiences = timeline
    .filter(exp => exp.enabled && !exp.forEducation)
    .map(exp => {
      const startDate = new Date(exp.startDate).getFullYear();
      const endDate = exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present';
      return `${exp.jobTitle} at ${exp.company_name} (${startDate} - ${endDate})`;
    });

  // Filter enabled projects
  const projectList = projects
    .filter(project => project.enabled)
    .map(project => {
      const liveLink = project.liveurl && project.liveurl !== '#' ? ` - Live: ${project.liveurl}` : '';
      const githubLink = project.githuburl && project.githuburl !== '#' ? ` - GitHub: ${project.githuburl}` : '';
      return `${project.title}: ${project.description}${liveLink}${githubLink}`;
    });

  // Filter enabled services
  const serviceList = services
    .filter(service => service.enabled)
    .map(service => `${service.name} (${service.charge}): ${service.desc}`);

  const socialLinksText = [
    `LinkedIn: ${about.socialLinks.linkedin}`,
    `GitHub: ${about.socialLinks.github}`,
    `Instagram: ${about.socialLinks.instagram}`,
    `X (Twitter): ${about.socialLinks.x}`,
    `LeetCode: ${about.socialLinks.leetcode}`,
    `Codeforces: ${about.socialLinks.codeforces}`
  ].join('\n- ');

  return `You are ${about.name}'s Portfolio Assistant. You help visitors learn about ${about.name}'s work, experience, and services.

ABOUT ${about.name.toUpperCase()}: ${about.description}

CURRENT ROLE: ${about.title} - ${about.subTitle}

SKILLS: ${enabledSkills.join(', ')}

WORK EXPERIENCE:
- ${workExperiences.join('\n- ')}

PROJECTS:
- ${projectList.join('\n- ')}

SERVICES OFFERED:
- ${serviceList.join('\n- ')}

SOCIAL LINKS:
- ${socialLinksText}

RESPONSE RULES:
- Keep responses under 100 words
- ALWAYS use proper markdown formatting for links: [text](url)
- For contact information, format like this: [Email](mailto:${about.contactEmail}), [LinkedIn](${about.socialLinks.linkedin}), [GitHub](${about.socialLinks.github})
- Use **bold** for emphasis when needed
- Use bullet points (-) for lists when appropriate
- Be conversational and helpful
- Focus on ${about.name}'s expertise and projects
- Answer questions about technical skills, experience, and projects
- If unsure about details, suggest visiting the portfolio sections
- You are ${about.name}'s assistant, not ${about.name} himself
- Always refer to ${about.name} in third person (he/him)
- Use phrases like "Subham has...", "He specializes in...", "His experience includes..."
- Always be professional but friendly
- Highlight achievements and impact when discussing projects
- Mention specific technologies and frameworks when relevant
- IMPORTANT: Always format links as [text](url) - never just show plain URLs
- For work inquiries, always provide properly formatted contact links

EXAMPLE FORMATTING:
- Contact: [Email](mailto:${about.contactEmail}), [LinkedIn](${about.socialLinks.linkedin})
- Project: [Project Name](https://example.com)
- Skills: **React**, **Node.js**, **Python**

CRITICAL: When providing contact information, ALWAYS use this exact format:
"For work inquiries, feel free to reach out to Subham via:
- [Email](mailto:${about.contactEmail}) (${about.contactEmail})
- [LinkedIn](${about.socialLinks.linkedin}) (${about.socialLinks.linkedin})
- [GitHub](${about.socialLinks.github}) (${about.socialLinks.github})
- [X (Twitter)](${about.socialLinks.x}) (${about.socialLinks.x})"

If markdown links don't work properly, provide both the clickable link and the full URL in parentheses for clarity.

Your goal: Help visitors learn about Subham's work in a friendly, concise way while showcasing his expertise and achievements with proper markdown formatting.`;
}

export const chatSuggestions = [
  'What technologies do you work with?',
  'Tell me about your recent projects',
  'How can I contact you for work?',
  'What is your experience with AI/ML?',
  'Can you tell me about your blockchain projects?',
  'What services do you offer?',
  'Tell me about your education background',
  'What are your strongest programming skills?'
];
