import { Metadata } from "next";
import { siteConfig } from "./site";

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  const month = newDate.toLocaleString("en-US", { month: "short" }); // Short month name like Nov
  const year = newDate.getFullYear();

  return { month, year };
};

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/images/icons/3097084.webp",
  noIndex = false,
  canonical = siteConfig.url,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    keywords: [
      "Subham Mahapatra",
      "devxsubh",
      "Subham Mahapatra developer",
      "devxsubh portfolio",
      "Subham Mahapatra portfolio",
      "devxsubh developer",
      "Subham Mahapatra React developer",
      "devxsubh React developer",
      "Subham Mahapatra Next.js developer",
      "devxsubh Next.js developer",
      "Subham Mahapatra full stack developer",
      "devxsubh full stack developer",
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "Node.js Developer",
      "TypeScript Developer",
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Creative Web Developer",
      "MERN Stack Developer",
      "Custom API Development",
      "3D Web Applications",
      "Responsive Website Design",
      "E-commerce Website Development",
      "SaaS Application Development",
      "Single Page Applications (SPA)",
      "Hire Full Stack Developer in USA",
      "Hire React Developer in Europe",
      "Freelance Web Developer Worldwide",
      "Best Software Engineer India USA Europe",
      "Portfolio Projects React Next.js",
      "Agile Web Development",
      "Code Optimization & Debugging",
      "Web Application Deployment",
      "Project Consultation",
      "Free Project Discussion",
      "Web Development Consultation",
      "Mobile App Development Consultation",
      "UI/UX Design Consultation",
      "Software Development Services",
      "Custom Software Development",
      "Project Planning & Strategy",
      "Technical Consultation"
    ],
    authors: [
      {
        name: "Subham Mahapatra",
        url: siteConfig.url,
      },
    ],
    creator: "Subham Mahapatra",
    publisher: "Subham Mahapatra",
    openGraph: {
      type: "website",
      locale: "en_US", // keep en_US for global reach
      url: siteConfig.url,
      title,
      description,
      siteName: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
    other: {
      "linkedin:creator": "https://www.linkedin.com/in/devxsubh/",
      "geo.region": "IN",
      "geo.placename": "Delhi",
      "geo.position": "28.6139;77.2090",
      "ICBM": "28.6139, 77.2090",
      "format-detection": "telephone=no",
      "theme-color": "#000000",
      "color-scheme": "dark",
      "viewport": "width=device-width, initial-scale=1, maximum-scale=5",
    },
  };
}
