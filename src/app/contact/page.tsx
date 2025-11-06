import { Metadata } from 'next';
import { Portfolio } from '@/utils/interface';
import portfolioData from '@/dummy.json';
import Header from '@/components/header';
import ContactPageContent from '@/components/ContactPageContent';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.contact.title,
  description: pageSEOConfigs.contact.description,
  keywords: pageSEOConfigs.contact.keywords,
  image: pageSEOConfigs.contact.image,
  url: pageSEOConfigs.contact.url,
  type: 'website'
});

export default function ContactPage() {
  const portfolio = portfolioData as Portfolio;
  const { about, social_handles, email } = portfolio;

  // Structured data for SEO
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Subham Mahapatra",
    "description": "Contact page for Subham Mahapatra - Software Developer specializing in React, Next.js, Node.js, and UI/UX design",
    "url": "https://www.devxsubh.com/contact",
    "mainEntity": {
      "@type": "Person",
      "name": about.name,
      "jobTitle": about.title,
      "description": about.description,
      "email": email,
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
      ]
    },
    "potentialAction": {
      "@type": "ContactAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.devxsubh.com/contact",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "object": {
        "@type": "ContactForm",
        "name": "Contact Form",
        "description": "Contact form for reaching out to Subham Mahapatra"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <Header social={social_handles} />

      <main className="pt-16">
        <ContactPageContent 
          email={email} 
          social_handle={social_handles} 
          about={about} 
        />
      </main>
    </div>
  );
}
