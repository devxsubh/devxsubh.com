import { MetadataRoute } from 'next'
import portfolioData from '@/dummy.json'
import blogsData from '@/data/blogs.json'
import { Portfolio } from '@/utils/interface'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.devxsubh.com'
  const portfolio = portfolioData as Portfolio
  const currentDate = new Date()
  
  // Generate project URLs dynamically - only include enabled projects
  const projectUrls = portfolio.projects
    .filter((project) => project.enabled !== false) // Only include enabled projects
    .map((project) => ({
      url: `${baseUrl}/projects/${project._id}`,
      lastModified: new Date(portfolio.updatedAt || portfolio.createdAt || currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  
  // Generate blog URLs dynamically - automatically includes all blogs from JSON
  const blogUrls = blogsData.blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: new Date(blog.updatedAt || blog.publishedAt || currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Note: This sitemap is automatically generated at build time
  // When you add new projects or blogs, they will automatically appear in the sitemap
  
  return [
    // Main pages with optimized priorities
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/discuss-project`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Dynamic project URLs (automatically generated from portfolio data)
    ...projectUrls,
    
    // Dynamic blog URLs (automatically generated from blog data)
    ...blogUrls,
  ]
}

// This sitemap is automatically generated at build time and served at /sitemap.xml
// All dynamic pages (projects and blogs) are automatically included when you add new entries
// No need to manually update - it reads directly from your data files!
