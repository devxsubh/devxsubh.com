import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Metadata } from 'next';
import ResumeClient from './ResumeClient';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.resume.title,
  description: pageSEOConfigs.resume.description,
  keywords: pageSEOConfigs.resume.keywords,
  image: pageSEOConfigs.resume.image,
  url: pageSEOConfigs.resume.url,
  type: 'website'
});

export default function ResumePage() {
  return <ResumeClient />;
}
