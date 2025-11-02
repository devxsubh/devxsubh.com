import About from "@/components/about";
import Contact from "@/components/Contact";
import Header from "@/components/header";
// import Hero from "@/components/hero";
import Hero from "@/components/newhero";
import Projects from "@/components/projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/testimonials";
import Timeline from "@/components/Timeline";
import { Portfolio } from "@/utils/interface";
import Gallery from "@/components/Gallery";
import ProjectsSection from "@/components/ProjectsSection";
import ExploreSection from "@/components/ExploreSection";
import { GSAPStaircaseTransition } from "@/components/ui/GSAPPageTransition";
import Script from 'next/script';
import { Metadata } from 'next';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.home.title,
  description: pageSEOConfigs.home.description,
  keywords: pageSEOConfigs.home.keywords,
  image: pageSEOConfigs.home.image,
  url: pageSEOConfigs.home.url,
  type: 'website'
});

export default async function Home() {
  const portfolio = (await import("@/dummy.json")).default;

  const {
    about,
    testimonials,
    services,
    skills,
    projects,
    social_handles,
    timeline,
    email,
  } = portfolio as Portfolio;

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Subham Mahapatra Portfolio",
    "description": "Portfolio showcasing Software Development projects, skills, and services by Subham Mahapatra. Specializing in React, Next.js, Node.js, and UI/UX design with 2+ years of experience.",
    "author": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "jobTitle": "Software Developer",
      "url": "https://www.devxsubh.com",
      "email": "connect.at.subham@gmail.com"
    },
    "creator": {
      "@type": "Person",
      "name": "Subham Mahapatra"
    },
    "dateCreated": "2024",
    "genre": "Portfolio",
    "keywords": "Software Developer, React, Next.js, Node.js, UI/UX Design, Web Development, AI/ML, 3D Visuals",
    "offers": {
      "@type": "Offer",
      "description": "Software Development Services",
      "category": "Web Development Services"
    },
    "hasPart": [
      {
        "@type": "CreativeWork",
        "name": "Weather Dashboard",
        "description": "An intuitive weather dashboard providing detailed weather information, forecasts, and climate data. Features location-based weather, interactive maps, weather alerts, and historical weather data visualization.",
        "url": "https://example.com",
        "creator": {
          "@type": "Person",
          "name": "Subham Mahapatra"
        }
      },
      {
        "@type": "CreativeWork",
        "name": "Task Management App", 
        "description": "A collaborative task management application designed for teams. Includes features like project boards, task assignments, deadline tracking, team collaboration tools, and real-time notifications to boost productivity.",
        "url": "https://example.com",
        "creator": {
          "@type": "Person",
          "name": "Subham Mahapatra"
        }
      },
      {
        "@type": "CreativeWork",
        "name": "Wonder Creative Studio",
        "description": "A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product management, shopping cart functionality, payment integration, and an admin dashboard for managing orders and inventory.",
        "url": "#",
        "creator": {
          "@type": "Person",
          "name": "Subham Mahapatra"
        }
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Software Development Services",
    "description": "Professional Software Development services including Web & App Development, UI/UX Design, Automation & AI, Business Consulting, and Content Marketing",
    "provider": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "jobTitle": "Software Developer",
      "email": "connect.at.subham@gmail.com"
    },
    "serviceType": "Software Development",
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.devxsubh.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web & App Development",
            "description": "I build brands through cultural insights & strategic vision. Custom crafted business solutions.",
            "offeredBy": {
              "@type": "Person",
              "name": "Subham Mahapatra"
            }
          },
          "price": "600",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design",
            "description": "Design direction for business. Get your business on the next level. We help to create great experiences.",
            "offeredBy": {
              "@type": "Person",
              "name": "Subham Mahapatra"
            }
          },
          "price": "399",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automation & AI",
            "description": "Custom automation and AI solutions. Get your business on the next level. We provide worldwide automation and AI/ML solutions.",
            "offeredBy": {
              "@type": "Person",
              "name": "Subham Mahapatra"
            }
          },
          "price": "699",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Consulting",
            "description": "I build businesses through cultural insights & strategic vision. Custom crafted business solutions.",
            "offeredBy": {
              "@type": "Person",
              "name": "Subham Mahapatra"
            }
          },
          "price": "499",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Marketing",
            "description": "I build businesses through cultural insights & strategic vision. Custom crafted content marketing solutions.",
            "offeredBy": {
              "@type": "Person",
              "name": "Subham Mahapatra"
            }
          },
          "price": "499",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <main className="relative">
        <Header social={social_handles} />
        <Hero about={about}/>
        <About about={about} timeline={timeline} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Timeline timeline={timeline} />
        <Gallery />
        <ExploreSection/>
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
        <Contact email={email} social_handle={social_handles} about={about} />
      </main>
    </>
  );
}
