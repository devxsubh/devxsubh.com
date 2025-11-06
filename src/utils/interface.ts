export interface Portfolio {
  about: About;
  _id: string;
  username: string;
  email: string;
  role: string;
  timeline: Timeline[];
  skills: Skill[];
  youtube: any[];
  projects: Project[];
  social_handles: SocialHandle[];
  services: Service[];
  testimonials: Testimonial[];
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}

export interface About {
  socialLinks: any;
  name: string;
  title: string;
  subTitle: string;
  description: string;
  quote: string;
  exp_year: string;
  address: string;
  some_total: string;
  phoneNumber: string;
  avatar: Avatar;
  alternateAvatars: any[];
}

export interface Avatar {
  public_id: string;
  url: string;
}

export interface Skill {
  enabled: boolean;
  name: string;
  sequence: number;
  percentage: number;
  image: Avatar;
  _id: string;
}

export interface Project {
  _id: string
  title: string
  description: string
  sequence: number
  liveurl: string
  githuburl: string
  image: {
    public_id: string
    url: string
  }
  techStack: string[]
  enabled: boolean
  // Enhanced fields for detailed project information
  timeline?: string
  role?: string
  team?: string
  status?: string
  overview?: string
  keyFeatures?: string[]
  challenges?: string[]
  learnings?: string[]
  impact?: string[]
  futureEnhancements?: string[]
}

export interface Image {
  public_id: string;
  url: string;
}

export interface SocialHandle {
  platform: string;
  url: string;
  enabled: boolean;
  _id: string;
}

export interface Service {
  name: string;
  charge: string;
  desc: string;
  enabled: boolean;
  _id: string;
  image: Image;
}

export interface Testimonial {
  image: Image;
  name: string;
  review: string;
  position: string;
  enabled: boolean;
  _id: string;
}

export interface Timeline {
  company_name: string;
  summary: string;
  sequence: number;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobLocation: string;
  bulletPoints: string[];
  forEducation: boolean;
  enabled: boolean;
  _id: string;
}
