import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import data from "@/dummy.json"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const blogsData = await import('@/data/blogs.json');
    const post = blogsData.default.blogs.find(b => b.id === params.id);

    if (!post) {
      return {
        title: 'Blog Post Not Found',
      };
    }

    const baseUrl = 'https://www.devxsubh.com';
    const canonicalUrl = `${baseUrl}/blogs/${params.id}`;
    const imageUrl = post.featuredImage 
      ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${baseUrl}${post.featuredImage}`)
      : `${baseUrl}/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp`;

    return {
      title: `${post.title} - Subham Mahapatra Blog`,
      description: post.excerpt || post.content.substring(0, 160),
      keywords: [...post.tags, post.category, 'Subham Mahapatra', 'devxsubh'].join(', '),
      authors: [{ name: post.author || 'Subham Mahapatra' }],
      creator: post.author || 'Subham Mahapatra',
      publisher: 'Subham Mahapatra',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        type: 'article',
        url: canonicalUrl,
        siteName: 'Subham Mahapatra Portfolio',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [post.author || 'Subham Mahapatra'],
        section: post.category,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        site: '@devxsubh',
        creator: '@devxsubh',
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        images: [imageUrl],
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post',
    };
  }
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  try {
    const blogsData = await import('@/data/blogs.json');
    const post = blogsData.default.blogs.find(b => b.id === params.id);

    if (!post) {
      notFound();
    }

    // Format the date to match the UI
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-background">
      <Header social={data.social_handles} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to blog</span>
        </Link>

        <article>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {post.featuredImage && (
            <div className="mb-12 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 aspect-video relative">
              <Image 
                src={post.featuredImage} 
                alt={post.title} 
                fill
                className="object-cover" 
                priority
              />
            </div>
          )}

          <p className="text-lg text-foreground/80 mb-8 leading-relaxed italic border-l-4 border-primary pl-6">
            {post.excerpt}
          </p>

          <div className="prose prose-invert max-w-none mb-12">
            <MarkdownRenderer content={post.content} />
          </div>

          <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </article>

      </main>
    </div>
  );
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const blogsData = await import('@/data/blogs.json');
    return blogsData.default.blogs.map((blog) => ({
      id: blog.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
