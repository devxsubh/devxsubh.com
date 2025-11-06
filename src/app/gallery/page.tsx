import Footer from "@/components/Footer"
import Header from "@/components/header"
import InfiniteGallery from "@/components/ui/3d-gallery"
import { Portfolio } from "@/utils/interface";
import { Metadata } from 'next';
import { generateAdvancedMetadata, pageSEOConfigs } from '@/config/advanced-seo';

export const metadata: Metadata = generateAdvancedMetadata({
  title: pageSEOConfigs.gallery.title,
  description: pageSEOConfigs.gallery.description,
  keywords: pageSEOConfigs.gallery.keywords,
  image: pageSEOConfigs.gallery.image,
  url: pageSEOConfigs.gallery.url,
  type: 'website'
});

export default async function GalleryPage() {
  const galleryImages = [
    {
      src: "/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp",
      alt: "Subham Mahapatra - Professional Software Developer Headshot | Creative Portfolio Gallery",
    },
    {
      src: "/images/personal/img_8218.webp",
      alt: "Creative Photography by Subham Mahapatra | Visual Storytelling Art",
    },
    {
      src: "/images/personal/dsc_3038.webp",
      alt: "Professional Photography Work | Digital Art Gallery Collection",
    },
    {
      src: "/images/personal/dsc_3304.webp",
      alt: "Portrait Photography Art | Creative Visual Storytelling",
    },
    {
      src: "/images/personal/img_5430.webp",
      alt: "Personal Photography Moment | Creative Visual Expression",
    },
    {
      src: "/images/personal/img_8308.webp",
      alt: "Photography Art Gallery | Creative Visual Portfolio",
    },
    {
      src: "/images/personal/img_9999.webp",
      alt: "Creative Photography Shot | Digital Art Collection",
    },
    {
      src: "/images/personal/f41ebe11.webp",
      alt: "Personal Photography Work | Visual Storytelling Gallery",
    },
    {
      src: "/images/personal/773d75a4.webp",
      alt: "Creative Photography Portfolio | Digital Art Showcase",
    },
    {
      src: "/images/projects/Project (1).webp",
      alt: "Web Development Project Showcase | Full Stack Developer Portfolio",
    },
    {
      src: "/images/projects/Project (2).webp",
      alt: "React Next.js Project | Modern Web Application Development",
    },
    {
      src: "/images/projects/Project (3).webp",
      alt: "Mobile App Development Project | Cross-Platform Application",
    },
    {
      src: "/images/projects/Project (4).webp",
      alt: "E-commerce Website Project | Online Store Development",
    },
    {
      src: "/images/projects/Project (5).webp",
      alt: "UI/UX Design Project | Creative Digital Interface Design",
    },
    {
      src: "/images/projects/Project (6).webp",
      alt: "Portfolio Website Project | Personal Branding Development",
    },
    {
      src: "/images/projects/Project (7).webp",
      alt: "Web Application Project | Full Stack Development Showcase",
    },
    {
      src: "/images/projects/Project (8).webp",
      alt: "Creative Web Project | Innovative Digital Solution",
    },
  ]
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
    <>
    {/* Structured Data for SEO */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Subham Mahapatra Creative Gallery",
          "description": "Interactive 3D gallery showcasing personal photography, project portfolios, and creative visual storytelling by Subham Mahapatra",
          "url": "https://www.devxsubh.com/gallery",
          "author": {
            "@type": "Person",
            "name": "Subham Mahapatra",
            "url": "https://www.devxsubh.com",
            "jobTitle": "Full Stack Developer & Creative Photographer"
          },
          "image": galleryImages.map(img => ({
            "@type": "ImageObject",
            "url": `https://www.devxsubh.com${img.src}`,
            "name": img.alt,
            "description": img.alt
          })),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.devxsubh.com/gallery"
          }
        })
      }}
    />
    <main className="min-h-screen w-full">
      <Header social={portfolio.social_handles} />
      <InfiniteGallery
        images={galleryImages}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full rounded-lg overflow-hidden"
      />
      <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl tracking-tight mb-4">
            <span className="block">Every pixel, tells a story</span>
          </h1>
        </div>
      </div>

        <div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
          <p>Creative Gallery Portfolio by Subham Mahapatra</p>
          <p className="opacity-60">Immerse yourself in a journey through creativity, innovation, and visual storytelling</p>
        </div>
    </main>

    {/* SEO Content - Hidden but accessible to search engines */}
    <div className="sr-only">
      <h2>Creative Gallery Portfolio by Subham Mahapatra</h2>
      <p>
        Welcome to my interactive 3D gallery, where every image tells a unique story of creativity, 
        innovation, and visual excellence. This immersive experience showcases my journey as a 
        Full Stack Developer and Creative Photographer, featuring personal photography work, 
        project portfolios, and digital art collections.
      </p>
      
      <h3>Gallery Features</h3>
      <ul>
        <li>Interactive 3D navigation with mouse wheel, arrow keys, and touch support</li>
        <li>Click-to-zoom functionality for detailed image viewing</li>
        <li>Auto-play feature with 3-second inactivity timeout</li>
        <li>Responsive design optimized for all devices</li>
        <li>High-quality WebP image format for optimal performance</li>
      </ul>

      <h3>Content Categories</h3>
      <ul>
        <li><strong>Personal Photography:</strong> Creative visual storytelling, portrait photography, and artistic expressions</li>
        <li><strong>Project Showcases:</strong> Web development projects, mobile applications, and digital solutions</li>
        <li><strong>Professional Work:</strong> Full-stack development portfolios and creative design projects</li>
      </ul>

      <h3>Technical Excellence</h3>
      <p>
        Built with cutting-edge web technologies including React, Next.js, Three.js, and WebGL, 
        this gallery represents the perfect fusion of technical expertise and creative vision. 
        Each image is carefully curated and optimized to deliver an exceptional user experience 
        while maintaining fast loading times and accessibility standards.
      </p>
    </div>
    </>
  )
}
