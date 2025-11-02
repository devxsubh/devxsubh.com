import { Metadata } from 'next';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.projects.title,
  description: pageSEOConfigs.projects.description,
  keywords: pageSEOConfigs.projects.keywords,
  image: pageSEOConfigs.projects.image,
  url: pageSEOConfigs.projects.url,
  type: 'website'
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

