'use client';

import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import Footer from '../../components/Footer';

export default function ResumeClient() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/about">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to About
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => {
                // Download the PDF directly
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Subham_Mahapatra_Resume.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-background border border-border rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-[8.5/11] w-full">
            <iframe
              src="/resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
              className="w-full h-full border-0"
              title="Resume PDF"
            />
          </div>
        </div>
        
        {/* Fallback for browsers that don't support PDF embedding */}
        <div className="mt-4 text-center">
          <p className="text-foreground/70 text-sm mb-4">
            Having trouble viewing the PDF? 
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              window.open('/resume.pdf', '_blank');
            }}
          >
            Open PDF in New Tab
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}