import { Blog } from "@/components/ui/blog-section-with-rich-preview"
import Header from "@/components/header";
import { Portfolio } from "@/utils/interface";
import { GSAPStaircaseTransition } from "@/components/ui/GSAPPageTransition";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.blogs.title,
  description: pageSEOConfigs.blogs.description,
  keywords: pageSEOConfigs.blogs.keywords,
  image: pageSEOConfigs.blogs.image,
  url: pageSEOConfigs.blogs.url,
  type: 'website'
});

export default async function BlogPage() {

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
  return (
    // <GSAPStaircaseTransition>
    <>
      <Header social={social_handles} />
      <Blog />
    </>
    // </GSAPStaircaseTransition>
  );
}