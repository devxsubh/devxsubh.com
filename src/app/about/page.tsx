import { Metadata } from 'next';
import { Portfolio } from '@/utils/interface';
import portfolioData from '@/dummy.json';
import Header from '@/components/header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AboutContent from '../../components/AboutContent';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.about.title,
  description: pageSEOConfigs.about.description,
  keywords: pageSEOConfigs.about.keywords,
  image: pageSEOConfigs.about.image,
  url: pageSEOConfigs.about.url,
  type: 'profile'
});

export default function AboutPage() {
  const portfolio = portfolioData as Portfolio;
  const { about, timeline } = portfolio;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": about.name,
    "jobTitle": about.title,
    "description": about.description,
    "url": "https://www.devxsubh.com",
    "image": about.avatar.url,
    "email": portfolio.email,
    "telephone": about.phoneNumber,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "India"
    },
    "sameAs": [
      about.socialLinks.linkedin,
      about.socialLinks.github,
      about.socialLinks.instagram,
      about.socialLinks.x,
      about.socialLinks.leetcode,
      about.socialLinks.codeforces
    ],
    "knowsAbout": [
      "Software Development",
      "React",
      "Next.js",
      "Node.js",
      "AI/ML",
      "3D Visuals",
      "UI/UX Design"
    ],
    "alumniOf": timeline
      .filter(item => item.forEducation)
      .map(item => item.company_name),
    "worksFor": timeline
      .filter(item => !item.forEducation)
      .map(item => ({
        "@type": "Organization",
        "name": item.company_name
      }))
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Header social={portfolio.social_handles} />

      <main className="pt-16">
        <AboutContent about={about} timeline={timeline} />
      </main>
    </div>
  );
}
