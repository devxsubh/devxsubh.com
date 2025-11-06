const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.devxsubh.com";

export const siteConfig = {
  name: "Subham Mahapatra (devxsubh) | Full Stack & UI/UX Developer",
  description:
    "Subham Mahapatra (devxsubh) - Full Stack Developer specializing in React, Next.js, Node.js, and UI/UX design. Professional web development services for clients worldwide. Contact Subham Mahapatra for your next project.",
  url: site_url,
  ogImage: `${site_url}/images/personal/74754375-73A5-4F4E-B6D4-D9A235716E59.webp`,
  username: "devxsubh",
  links: {
    linkedin: "https://www.linkedin.com/in/devxsubh/",
    github: "https://github.com/devxsubh",
    instagram: "https://www.instagram.com/devxsubh/",
    x: "https://x.com/devxsubh",
  },
  mailSupport: "connect.at.subham@gmail.com",
};
