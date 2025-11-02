import { Metadata } from 'next';

// Base SEO configuration
export const baseSEOConfig = {
  title: 'Subham Mahapatra | Full Stack Developer & Tech Strategist',
  description: 'Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Based in Delhi, India.',
  keywords: [
    'Subham Mahapatra',
    'devxsubh',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Software Developer',
    'Web Developer',
    'AI/ML Developer',
    'UI/UX Designer',
    'Tech Strategist',
    'Delhi Developer',
    'India Developer',
    'Portfolio',
    'Web Development Services',
    'Mobile App Development',
    'Business Consulting',
    'Automation Solutions'
  ],
  authors: [{ name: 'Subham Mahapatra', url: 'https://www.devxsubh.com' }],
  creator: 'Subham Mahapatra',
  publisher: 'Subham Mahapatra',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.devxsubh.com',
    siteName: 'Subham Mahapatra Portfolio',
    images: [
      {
        url: 'https://www.devxsubh.com/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp',
        width: 1200,
        height: 630,
        alt: 'Subham Mahapatra - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@devxsubh',
    images: ['https://www.devxsubh.com/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'],
  },
  alternates: {
    canonical: 'https://www.devxsubh.com',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || '',
    yahoo: process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION || '',
  },
};

// Page-specific SEO configurations
export const pageSEOConfig = {
  home: {
    title: 'Subham Mahapatra | Full Stack Developer & Tech Strategist',
    description: 'Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Available for new opportunities.',
    keywords: 'Subham Mahapatra, devxsubh, Full Stack Developer, React Developer, Next.js Developer, Software Developer, Portfolio',
  },
  about: {
    title: 'About - Subham Mahapatra | Software Developer',
    description: 'Learn more about Subham Mahapatra, a software developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Based in Delhi, India.',
    keywords: 'Subham Mahapatra, Software Developer, About, React Developer, Next.js, Node.js, AI/ML, Delhi India',
  },
  contact: {
    title: 'Contact - Subham Mahapatra | Get In Touch',
    description: 'Get in touch with Subham Mahapatra for software development services, web development, UI/UX design, and business consulting. Contact form available for project inquiries.',
    keywords: 'Contact Subham Mahapatra, Software Developer Contact, Web Development Services, UI/UX Design, Business Consulting, Project Inquiry, devxsubh',
  },
  resume: {
    title: 'Resume - Subham Mahapatra | Software Developer',
    description: 'Download Subham Mahapatra\'s resume/CV. Full Stack Developer with 2+ years of experience in React, Next.js, Node.js, and AI/ML. Available for new opportunities.',
    keywords: 'Subham Mahapatra Resume, CV Download, Software Developer Resume, Full Stack Developer CV, React Developer Resume, Next.js Developer CV',
  },
  projects: {
    title: 'Projects - Subham Mahapatra | Portfolio',
    description: 'Explore Subham Mahapatra\'s portfolio of web development projects including React, Next.js, Node.js applications, and AI/ML solutions.',
    keywords: 'Subham Mahapatra Projects, Portfolio, Web Development Projects, React Projects, Next.js Projects, Software Development Portfolio',
  },
  blogs: {
    title: 'Blog - Subham Mahapatra | Tech Insights',
    description: 'Read Subham Mahapatra\'s blog posts about web development, React, Next.js, AI/ML, and software development best practices.',
    keywords: 'Subham Mahapatra Blog, Tech Blog, Web Development Blog, React Blog, Next.js Blog, Software Development Blog, AI/ML Blog',
  },
  discussProject: {
    title: 'Discuss Project - Subham Mahapatra | Project Consultation',
    description: 'Discuss your project ideas with Subham Mahapatra. Get expert consultation for web development, mobile apps, and AI/ML solutions.',
    keywords: 'Project Discussion, Software Development Consultation, Web Development Consultation, Project Planning, Tech Consultation',
  },
};

// Helper function to generate page metadata
export function generatePageMetadata(page: keyof typeof pageSEOConfig, customTitle?: string, customDescription?: string): Metadata {
  const config = pageSEOConfig[page];
  
  return {
    ...baseSEOConfig,
    title: customTitle || config.title,
    description: customDescription || config.description,
    keywords: config.keywords,
    openGraph: {
      ...baseSEOConfig.openGraph,
      title: customTitle || config.title,
      description: customDescription || config.description,
      url: `https://www.devxsubh.com/${page === 'home' ? '' : page}`,
    },
    twitter: {
      ...baseSEOConfig.twitter,
      title: customTitle || config.title,
      description: customDescription || config.description,
    },
    alternates: {
      canonical: `https://www.devxsubh.com/${page === 'home' ? '' : page}`,
    },
  };
}

// Structured data for different page types
export const structuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Subham Mahapatra",
    "alternateName": ["devxsubh", "Subham Mahapatra (devxsubh)", "@devxsubh"],
    "jobTitle": "Full Stack Developer",
    "description": "Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and UI/UX design.",
    "url": "https://www.devxsubh.com",
    "image": "https://www.devxsubh.com/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp",
    "email": "connect.at.subham@gmail.com",
    "telephone": "+91-6371007969",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/in/devxsubh/",
      "https://github.com/devxsubh",
      "https://leetcode.com/u/devxsubh/",
      "https://codeforces.com/profile/subhammahapatra004",
      "https://www.instagram.com/devxsubh/"
    ],
    "knowsAbout": [
      "React", "Next.js", "Node.js", "TypeScript", "JavaScript", "Python", "MongoDB", "PostgreSQL",
      "UI/UX Design", "Web Development", "AI/ML", "3D Visuals", "Full Stack Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Worldwide"
      }
    }
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Subham Mahapatra (devxsubh) Portfolio",
    "url": "https://www.devxsubh.com",
    "description": "Official portfolio of Subham Mahapatra (devxsubh) - Full Stack Developer specializing in React, Next.js, Node.js, and UI/UX design.",
    "author": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "alternateName": ["devxsubh", "Subham Mahapatra (devxsubh)", "@devxsubh"],
      "email": "connect.at.subham@gmail.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "alternateName": "devxsubh"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.devxsubh.com?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Subham Mahapatra (devxsubh) - Software Development Services",
    "url": "https://www.devxsubh.com",
    "description": "Professional software development services by Subham Mahapatra (devxsubh) specializing in React, Next.js, Node.js, and UI/UX design",
    "founder": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "alternateName": "devxsubh"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-6371007969",
      "contactType": "customer service",
      "email": "connect.at.subham@gmail.com",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceType": [
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "Full Stack Development",
      "React Development",
      "Next.js Development",
      "Node.js Development",
      "AI/ML Solutions"
    ]
  }
};
