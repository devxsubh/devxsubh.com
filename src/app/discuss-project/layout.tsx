import { Metadata } from "next";
import Script from "next/script";
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.discussProject.title,
  description: pageSEOConfigs.discussProject.description,
  keywords: pageSEOConfigs.discussProject.keywords,
  image: pageSEOConfigs.discussProject.image,
  url: pageSEOConfigs.discussProject.url,
  type: 'website'
});

export default function DiscussProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Project Discussion & Consultation",
    "description": "Professional consultation for web development, mobile app development, and UI/UX design projects. Get expert advice from Subham Mahapatra (devxsubh), a Full Stack Developer with 2+ years of experience. Contact Subham Mahapatra for professional web development services.",
    "provider": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "alternateName": ["devxsubh", "Subham Mahapatra (devxsubh)", "@devxsubh"],
      "jobTitle": "Full Stack Developer",
      "email": "connect.at.subham@gmail.com",
      "url": "https://www.devxsubh.com",
      "sameAs": [
        "https://www.linkedin.com/in/devxsubh/",
        "https://github.com/devxsubh",
        "https://www.instagram.com/devxsubh/"
      ]
    },
    "serviceType": "Web Development Consultation",
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.devxsubh.com/discuss-project",
      "serviceSmsNumber": "+91-6371007969",
      "serviceEmail": "connect.at.subham@gmail.com"
    },
    "offers": {
      "@type": "Offer",
      "description": "Free initial consultation for project discussion",
      "price": "0",
      "priceCurrency": "USD"
    },
    "category": [
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
    <>
      <Script
        id="discuss-project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {children}
    </>
  );
}
