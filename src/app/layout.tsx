import { Poppins } from "next/font/google";
import "./globals.css";
import { VariantProvider } from "@/utils/hooks";
import { constructMetadata } from "@/utils";
import LoaderWrapper from "@/components/LoaderWrapper";
import { AnimatePresence } from "@/lib/motion";
import ChatBot from "@/components/ChatBot";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Providers } from '@/components/Providers';
import { NotificationSystem } from '@/components/ui/NotificationSystem';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import { advancedSEOConfig, structuredDataGenerator } from "@/config/advanced-seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Subham Mahapatra",
    "alternateName": ["devxsubh", "Subham Mahapatra (devxsubh)", "@devxsubh"],
    "jobTitle": "Full Stack Developer",
    "description": "Subham Mahapatra (devxsubh) is a Full Stack Developer with 2+ years of experience specializing in React, Next.js, Node.js, and UI/UX design. Known professionally as devxsubh, Subham Mahapatra creates efficient and scalable web solutions for clients worldwide.",
    "url": "https://www.devxsubh.com",
    "image": "https://www.devxsubh.com/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp",
    "sameAs": [
      "https://www.linkedin.com/in/devxsubh/",
      "https://github.com/devxsubh",
      "https://leetcode.com/u/devxsubh/",
      "https://codeforces.com/profile/subhammahapatra004",
      "https://www.instagram.com/devxsubh/"
    ],
    "knowsAbout": [
      "Subham Mahapatra",
      "devxsubh",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "C++",
      "Python", 
      "Docker",
      "Figma",
      "MongoDB",
      "Three.js",
      "Redux",
      "Git",
      "Github",
      "AI/ML",
      "Web Development",
      "UI/UX Design",
      "3D Visuals",
      "User Interfaces",
      "Web Applications",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Wonder Creative Studio"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    },
    "email": "connect.at.subham@gmail.com",
    "telephone": "+91-6371007969",
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
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Worldwide"
      }
    },
    "award": [
      "Gold medalist in Maths olympiad",
      "Codeforces 1100+ rating",
      "85% in 10th board exams",
      "88% in 12th board exams"
    ]
  };

  const websiteSchema = {
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
      "knowsAbout": [
        "Subham Mahapatra", "devxsubh", "React", "Next.js", "Node.js", "TypeScript", "JavaScript", 
        "UI/UX Design", "Web Development", "Full Stack Development"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Software Developer",
        "occupationLocation": {
          "@type": "Place",
          "name": "Worldwide"
        }
      }
    }
  };

  const organizationSchema = {
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
      "Node.js Development"
    ]
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Search Engine Verification */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION && (
          <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION && (
          <meta name="baidu-site-verification" content={process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION} />
        )}
        
        {/* Enhanced Robots Meta */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="slurp" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="duckduckbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Language and Content */}
        <meta name="language" content="English" />
        <meta name="content-language" content="en" />
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />
        
        {/* Content Classification */}
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="revisit-after" content="7 days" />
        <meta name="expires" content="never" />
        <meta name="classification" content="Portfolio, Web Development, Full Stack Developer, Subham Mahapatra, devxsubh, Software Development, AI/ML, UI/UX Design" />
        
        {/* Mobile Optimization */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Subham Portfolio" />
        <meta name="application-name" content="Subham Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Application Meta */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Author and Ownership */}
        <meta name="author" content="Subham Mahapatra (devxsubh)" />
        <meta name="copyright" content="Subham Mahapatra (devxsubh)" />
        <meta name="owner" content="Subham Mahapatra" />
        <meta name="designer" content="Subham Mahapatra (devxsubh)" />
        <meta name="developer" content="Subham Mahapatra (devxsubh)" />
        <meta name="publisher" content="Subham Mahapatra (devxsubh)" />
        
        {/* Content Description */}
        <meta name="subject" content="Subham Mahapatra devxsubh Full Stack Developer Portfolio" />
        <meta name="abstract" content="Official portfolio of Subham Mahapatra (devxsubh) - Full Stack Developer specializing in React, Next.js, Node.js, and UI/UX design" />
        <meta name="topic" content="Subham Mahapatra devxsubh web development portfolio" />
        <meta name="summary" content="Subham Mahapatra (devxsubh) - Professional Full Stack Developer with expertise in React, Next.js, Node.js, and UI/UX design" />
        <meta name="keywords" content={advancedSEOConfig.primaryKeywords.join(', ')} />
        
        {/* Contact Information */}
        <meta name="reply-to" content="connect.at.subham@gmail.com" />
        <meta name="email" content="connect.at.subham@gmail.com" />
        <meta name="contact" content="connect.at.subham@gmail.com" />
        <meta name="url" content="https://www.devxsubh.com" />
        <meta name="identifier-URL" content="https://www.devxsubh.com" />
        <meta name="canonical" content="https://www.devxsubh.com" />
        
        {/* Geographic and Coverage */}
        <meta name="coverage" content="Worldwide" />
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        
        {/* Analytics */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="de32ccac-4ed1-40ae-9f87-6086cf0253cc"></script>
        
        {/* Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGenerator.person),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGenerator.website),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGenerator.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGenerator.localBusiness),
          }}
        />
      </head>
      <GoogleAnalytics gaId="G-NP2750NS8F" />
      <body className={poppins.className}>
        <Providers>
          <AnimatePresence mode="wait">
            <VariantProvider>
              <LoaderWrapper>
                {children}
              </LoaderWrapper>
              <ChatBot />
              <NotificationSystem />
            </VariantProvider>
          </AnimatePresence>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
