import { Metadata } from 'next';

// Advanced SEO Configuration
export const advancedSEOConfig = {
  // Core SEO Settings
  baseUrl: 'https://www.devxsubh.com',
  siteName: 'Subham Mahapatra Portfolio',
  defaultTitle: 'Subham Mahapatra | Full Stack Developer & Tech Strategist',
  defaultDescription: 'Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Based in Delhi, India. Available for new opportunities.',
  
  // Primary Keywords (High Volume, High Intent)
  primaryKeywords: [
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

  // Long-tail Keywords (High Intent, Lower Competition)
  longTailKeywords: [
    'Full Stack Developer Delhi',
    'React Developer India',
    'Next.js Developer Portfolio',
    'Node.js Developer Services',
    'Software Developer Delhi',
    'Web Development Services India',
    'AI/ML Developer Portfolio',
    'UI/UX Designer Delhi',
    'Tech Strategist India',
    'Custom Web Development',
    'E-commerce Development',
    'Mobile App Development Delhi',
    'Business Automation Solutions',
    'Startup Tech Consulting',
    'Software Development Agency'
  ],

  // Technical Keywords
  technicalKeywords: [
    'React.js',
    'Next.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Figma',
    'Three.js',
    'Redux',
    'Git',
    'GitHub',
    'AI/ML',
    'Machine Learning',
    'Web Development',
    'UI/UX Design',
    '3D Visuals',
    'User Interfaces',
    'Web Applications',
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'API Development',
    'Database Design',
    'Cloud Computing',
    'DevOps',
    'Agile Development'
  ],

  // Location-based Keywords
  locationKeywords: [
    // Indian Cities
    'Delhi Developer',
    'India Developer',
    'NCR Developer',
    'Gurgaon Developer',
    'Gurugram Developer',
    'Noida Developer',
    'Mumbai Developer',
    'Bangalore Developer',
    'Bengaluru Developer',
    'Pune Developer',
    'Hyderabad Developer',
    'Chennai Developer',
    'Kolkata Developer',
    'Ahmedabad Developer',
    'Jaipur Developer',
    'Lucknow Developer',
    'Chandigarh Developer',
    'Indore Developer',
    'Bhopal Developer',
    'Kochi Developer',
    'Coimbatore Developer',
    'Vadodara Developer',
    'Surat Developer',
    'Nagpur Developer',
    'Visakhapatnam Developer',
    'Thiruvananthapuram Developer',
    'Bhubaneswar Developer',
    'Mysore Developer',
    'Mangalore Developer',
    'Goa Developer',
    
    // International Tech Hubs
    'Singapore Developer',
    'Silicon Valley Developer',
    'San Francisco Developer',
    'New York Developer',
    'London Developer',
    'Dubai Developer',
    'UAE Developer',
    'Toronto Developer',
    'Vancouver Developer',
    'Sydney Developer',
    'Melbourne Developer',
    'Berlin Developer',
    'Amsterdam Developer',
    'Stockholm Developer',
    'Copenhagen Developer',
    'Zurich Developer',
    'Tel Aviv Developer',
    'Tokyo Developer',
    'Seoul Developer',
    'Hong Kong Developer',
    'Shanghai Developer',
    'Beijing Developer',
    'Shenzhen Developer'
  ],

  // Service-based Keywords
  serviceKeywords: [
    'Web Development Services',
    'Mobile App Development',
    'UI/UX Design Services',
    'Full Stack Development',
    'React Development Services',
    'Next.js Development',
    'Node.js Development',
    'AI/ML Solutions',
    'Business Automation',
    'Tech Consulting',
    'Startup Consulting',
    'E-commerce Development',
    'Custom Software Development',
    'API Development',
    'Database Design',
    'Cloud Solutions',
    'DevOps Services'
  ],

  // Competitor Analysis Keywords
  competitorKeywords: [
    'Top React Developer',
    'Best Next.js Developer',
    'Expert Node.js Developer',
    'Professional Web Developer',
    'Skilled Software Developer',
    'Experienced Full Stack Developer',
    'Creative UI/UX Designer',
    'Innovative Tech Strategist',
    'Reliable Web Development',
    'Quality Software Solutions'
  ]
};

// Enhanced Metadata Generator
export function generateAdvancedMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Subham Mahapatra',
  section,
  tags = []
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const fullTitle = title.includes('Subham Mahapatra') ? title : `${title} - Subham Mahapatra`;
  const fullDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  const allKeywords = [...advancedSEOConfig.primaryKeywords, ...keywords].join(', ');
  
  return {
    metadataBase: new URL(advancedSEOConfig.baseUrl),
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: [{ name: author, url: advancedSEOConfig.baseUrl }],
    creator: author,
    publisher: author,
    
    // Enhanced Open Graph
    openGraph: {
      type: type,
      locale: 'en_US',
      url: url,
      siteName: advancedSEOConfig.siteName,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: image || `${advancedSEOConfig.baseUrl}/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp`,
          width: 1200,
          height: 630,
          alt: `${title} - Subham Mahapatra Portfolio`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Enhanced Twitter Cards
    twitter: {
      card: 'summary_large_image',
      site: '@devxsubh',
      creator: '@devxsubh',
      title: fullTitle,
      description: fullDescription,
      images: [image || `${advancedSEOConfig.baseUrl}/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp`],
    },

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Enhanced Robots
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

    // Additional Meta Tags
    other: {
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || '',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'Subham Portfolio',
      'application-name': 'Subham Portfolio',
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
      'mobile-web-app-capable': 'yes',
      'format-detection': 'telephone=no',
      'revisit-after': '7 days',
      'rating': 'General',
      'distribution': 'Global',
      'target': 'all',
      'HandheldFriendly': 'True',
      'MobileOptimized': '320',
      'language': 'English',
      'author': author,
      'copyright': author,
      'owner': author,
      'subject': `${title} - ${advancedSEOConfig.siteName}`,
      'abstract': fullDescription,
      'topic': allKeywords,
      'summary': fullDescription,
      'designer': author,
      'reply-to': 'connect.at.subham@gmail.com',
      'url': url,
      'identifier-URL': url,
      'coverage': 'Worldwide',
      'classification': allKeywords,
    },
  };
}

// Comprehensive Structured Data Generator
export const structuredDataGenerator = {
  // Person Schema with Enhanced Details
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Subham Mahapatra",
    "alternateName": ["devxsubh", "Subham Mahapatra (devxsubh)", "@devxsubh"],
    "jobTitle": "Full Stack Developer & Tech Strategist",
    "description": "Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Based in Delhi, India.",
    "url": "https://www.devxsubh.com",
    "image": "https://www.devxsubh.com/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp",
    "email": "connect.at.subham@gmail.com",
    "telephone": "+91-6371007969",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN",
      "postalCode": "110001"
    },
    "sameAs": [
      "https://www.linkedin.com/in/devxsubh/",
      "https://github.com/devxsubh",
      "https://leetcode.com/u/devxsubh/",
      "https://codeforces.com/profile/subhammahapatra004",
      "https://www.instagram.com/devxsubh/",
      "https://twitter.com/devxsubh"
    ],
    "knowsAbout": advancedSEOConfig.technicalKeywords,
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "skills": advancedSEOConfig.technicalKeywords,
      "responsibilities": [
        "Full Stack Web Development",
        "UI/UX Design",
        "AI/ML Solutions",
        "Business Consulting",
        "Technical Strategy"
      ]
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Newton School of Technology",
        "description": "B.Tech in Computer Science and Artificial Intelligence"
      },
      {
        "@type": "Organization", 
        "name": "Indian Institute Of Technology (IIT), Kharagpur",
        "description": "Research Intern in AI/ML for EMG-based Exoskeleton GUI Application"
      }
    ],
    "award": [
      "Gold medalist in Maths olympiad",
      "Codeforces 1100+ rating",
      "85% in 10th board exams",
      "88% in 12th board exams"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Wonder Creative Studio"
      }
    ]
  },

  // Enhanced Website Schema
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Subham Mahapatra (devxsubh) Portfolio",
    "url": "https://www.devxsubh.com",
    "description": "Official portfolio of Subham Mahapatra (devxsubh) - Full Stack Developer specializing in React, Next.js, Node.js, and UI/UX design. Professional web development services by Subham Mahapatra.",
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
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "alternateName": ["devxsubh", "Subham Mahapatra (devxsubh)", "@devxsubh"],
      "jobTitle": "Full Stack Developer",
      "description": "Subham Mahapatra (devxsubh) - Full Stack Developer with 2+ years of experience in React, Next.js, Node.js, and UI/UX design",
      "url": "https://www.devxsubh.com",
      "image": "https://www.devxsubh.com/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp",
      "sameAs": [
        "https://www.linkedin.com/in/devxsubh/",
        "https://github.com/devxsubh",
        "https://www.instagram.com/devxsubh/"
      ],
      "knowsAbout": advancedSEOConfig.technicalKeywords,
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Software Developer",
        "occupationLocation": {
          "@type": "Place",
          "name": "Worldwide"
        }
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.devxsubh.com"
        }
      ]
    }
  },

  // Enhanced Organization Schema
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
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "Worldwide"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN",
      "postalCode": "110001"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceType": advancedSEOConfig.serviceKeywords,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web & App Development",
            "description": "Custom web and mobile application development using modern technologies like React, Next.js, and Node.js"
          },
          "price": "600",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design",
            "description": "Professional user interface and user experience design services for web and mobile applications"
          },
          "price": "399",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI/ML Solutions",
            "description": "Custom artificial intelligence and machine learning solutions for business automation and optimization"
          },
          "price": "699",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Consulting",
            "description": "Strategic business consulting and technology advisory services for startups and enterprises"
          },
          "price": "499",
          "priceCurrency": "USD"
        }
      ]
    }
  },

  // Local Business Schema
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Subham Mahapatra - Software Development Services",
    "description": "Professional software development services in Delhi, India. Specializing in React, Next.js, Node.js, and AI/ML solutions.",
    "url": "https://www.devxsubh.com",
    "telephone": "+91-6371007969",
    "email": "connect.at.subham@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN",
      "postalCode": "110001"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "28.6139",
        "longitude": "77.2090"
      },
      "geoRadius": "1000000"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "INR, USD, EUR"
  }
};

// Page-specific SEO configurations
export const pageSEOConfigs = {
  home: {
    title: 'Subham Mahapatra | Full Stack Developer & Tech Strategist',
    description: 'Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Available for new opportunities.',
    keywords: [...advancedSEOConfig.primaryKeywords, ...advancedSEOConfig.locationKeywords],
    url: 'https://www.devxsubh.com',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  about: {
    title: 'About - Subham Mahapatra | Software Developer & Tech Strategist',
    description: 'Learn more about Subham Mahapatra, a software developer with 2+ years of experience specializing in React, Next.js, Node.js, and AI/ML. Based in Delhi, India.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'About', 'Experience', 'Skills', 'Education'],
    url: 'https://www.devxsubh.com/about',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  contact: {
    title: 'Contact - Subham Mahapatra | Get In Touch for Web Development',
    description: 'Get in touch with Subham Mahapatra for software development services, web development, UI/UX design, and business consulting. Contact form available for project inquiries.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'Contact', 'Hire', 'Web Development Services', 'Project Inquiry'],
    url: 'https://www.devxsubh.com/contact',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  resume: {
    title: 'Resume - Subham Mahapatra | Download CV | Software Developer',
    description: 'Download Subham Mahapatra\'s resume/CV. Full Stack Developer with 2+ years of experience in React, Next.js, Node.js, and AI/ML. Available for new opportunities.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'Resume', 'CV', 'Download', 'Hire'],
    url: 'https://www.devxsubh.com/resume',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  projects: {
    title: 'Projects - Subham Mahapatra | Portfolio & Case Studies',
    description: 'Explore Subham Mahapatra\'s portfolio of web development projects including React, Next.js, Node.js applications, and AI/ML solutions.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'Projects', 'Portfolio', 'Case Studies', 'Web Development Projects'],
    url: 'https://www.devxsubh.com/projects',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  blogs: {
    title: 'Blog - Subham Mahapatra | Tech Insights & Web Development',
    description: 'Read Subham Mahapatra\'s blog posts about web development, React, Next.js, AI/ML, and software development best practices.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'Blog', 'Tech Blog', 'Web Development Blog', 'Tutorials'],
    url: 'https://www.devxsubh.com/blogs',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  gallery: {
    title: 'Gallery - Subham Mahapatra | Creative Portfolio & Photography',
    description: 'Explore Subham Mahapatra\'s creative gallery featuring personal photography, project showcases, and visual storytelling. Immerse yourself in a 3D interactive experience.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'Gallery', 'Photography', 'Creative Portfolio', '3D Gallery'],
    url: 'https://www.devxsubh.com/gallery',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  },
  discussProject: {
    title: 'Discuss Project - Subham Mahapatra | Free Consultation',
    description: 'Discuss your project ideas with Subham Mahapatra. Get expert consultation for web development, mobile apps, and AI/ML solutions.',
    keywords: [...advancedSEOConfig.primaryKeywords, 'Project Discussion', 'Consultation', 'Free Quote', 'Project Planning'],
    url: 'https://www.devxsubh.com/discuss-project',
    image: '/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp'
  }
};

export default advancedSEOConfig;
