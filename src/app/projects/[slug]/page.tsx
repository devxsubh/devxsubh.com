import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Portfolio } from '@/utils/interface';
import portfolioData from '@/dummy.json';
import Header from '@/components/header';
import ProjectDetailPage from '../../../components/ProjectDetailPage';
import { Button } from '@/components/ui/button';
import { Separator } from '../../../components/ui/separator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getRelatedProjects, getProjectCategory, getSimilarityLabel } from '../../../lib/projectUtils';

// Generate static params for all projects
export async function generateStaticParams() {
  const portfolio = portfolioData as Portfolio;
  
  return portfolio.projects.map((project) => ({
    slug: project._id,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const portfolio = portfolioData as Portfolio;
  const project = portfolio.projects.find(p => p._id === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} - Subham Mahapatra Portfolio`;
  const description = project.overview || project.description;
  const keywords = project.techStack.join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Subham Mahapatra' }],
    creator: 'Subham Mahapatra',
    publisher: 'Subham Mahapatra',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.devxsubh.com/projects/${params.slug}`,
      siteName: 'Subham Mahapatra Portfolio',
      images: [
        {
          url: project.image.url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image.url],
      creator: '@devxsubh',
    },
    alternates: {
      canonical: `https://www.devxsubh.com/projects/${params.slug}`,
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const portfolio = portfolioData as Portfolio;
  const project = portfolio.projects.find(p => p._id === params.slug);

  if (!project) {
    notFound();
  }

  // Get related projects based on technology stack and category
  const relatedProjects = getRelatedProjects(project, portfolio.projects, 2);

  // Get project navigation (previous/next)
  const currentIndex = portfolio.projects.findIndex(p => p._id === project._id);
  const previousProject = currentIndex > 0 ? portfolio.projects[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolio.projects.length - 1 ? portfolio.projects[currentIndex + 1] : null;

  // Structured data for the project
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.overview || project.description,
    "url": `https://www.devxsubh.com/projects/${params.slug}`,
    "image": project.image.url,
    "author": {
      "@type": "Person",
      "name": "Subham Mahapatra",
      "url": "https://www.devxsubh.com"
    },
    "creator": {
      "@type": "Person",
      "name": "Subham Mahapatra"
    },
    "dateCreated": "2024",
    "genre": "Software Development",
    "keywords": project.techStack.join(", "),
    "programmingLanguage": project.techStack,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "description": "Software Development Project",
      "category": "Web Development"
    }
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to projects</span>
        </Link>

        <ProjectDetailPage project={project} />

        {/* Project Navigation */}
        {(previousProject || nextProject) && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              {previousProject ? (
                <Link href={`/projects/${previousProject._id}`} className="group">
                  <div className="flex items-center space-x-3 text-foreground/70 hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <p className="text-sm text-foreground/50">Previous Project</p>
                      <p className="font-medium">{previousProject.title}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextProject ? (
                <Link href={`/projects/${nextProject._id}`} className="group">
                  <div className="flex items-center space-x-3 text-foreground/70 hover:text-foreground transition-colors">
                    <div className="text-right">
                      <p className="text-sm text-foreground/50">Next Project</p>
                      <p className="font-medium">{nextProject.title}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Related Projects</h2>
              <p className="text-sm text-muted-foreground">
                Based on technology stack and category similarity
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedProjects.map((relatedProject) => {
                const similarityScore = relatedProject.score || 0;
                const similarity = getSimilarityLabel(similarityScore);
                
                return (
                  <div
                    key={relatedProject._id}
                    className="group rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted/50"
                  >
                    <Link href={`/projects/${relatedProject._id}`}>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                            {relatedProject.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                              relatedProject.status === 'Completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : relatedProject.status === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {relatedProject.status || 'Completed'}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedProject.description}
                        </p>
                        
                        {/* Show common technologies */}
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground font-medium">Technologies:</p>
                          <div className="flex flex-wrap gap-1">
                            {relatedProject.techStack.slice(0, 4).map((tech) => {
                              const isCommon = project.techStack.some(pTech => 
                                pTech.toLowerCase().includes(tech.toLowerCase()) || 
                                tech.toLowerCase().includes(pTech.toLowerCase())
                              );
                              return (
                                <span
                                  key={tech}
                                  className={`rounded px-2 py-1 text-xs ${
                                    isCommon 
                                      ? 'bg-primary/20 text-primary border border-primary/30' 
                                      : 'bg-muted'
                                  }`}
                                >
                                  {tech}
                                </span>
                              );
                            })}
                            {relatedProject.techStack.length > 4 && (
                              <span className="rounded bg-muted px-2 py-1 text-xs">
                                +{relatedProject.techStack.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Back to Projects CTA */}
      </main>
    </div>
  );
}
