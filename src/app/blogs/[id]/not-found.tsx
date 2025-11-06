import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/80 mb-4">Blog Post Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md">
          The blog post you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>
      </div>
    </div>
  );
}
