import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
          "/staging/",
          "/dev/",
          "/*.json$",
          "/*.xml$",
          "/*.txt$",
          "/search?*",
          "/404",
          "/500",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
        ],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
        ],
        crawlDelay: 2,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
      {
        userAgent: "YouBot",
        disallow: "/",
      },
    ],
    sitemap: "https://www.devxsubh.com/sitemap.xml",
    host: "https://www.devxsubh.com",
  };
}
