"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Footer from "../Footer"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorAvatar: string
  publishedAt: string
  updatedAt: string
  category: string
  tags: string[]
  featuredImage: string
  readTime: string
  featured: boolean
}

interface BlogResponse {
  blogs: BlogPost[]
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const fetchBlogs = async (page = 1, search = "", category = "all") => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        ...(search && { search }),
        ...(category !== "all" && { category }),
      })

      const response = await fetch(`/api/blogs?${params}`)
      if (!response.ok) throw new Error("Failed to fetch blogs")

      const data: BlogResponse = await response.json()
      setBlogs(data.blogs)
      setTotalPages(data.totalPages)
      setCurrentPage(data.page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch blogs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs(currentPage, searchQuery, selectedCategory)
  }, [currentPage, searchQuery, selectedCategory])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const categories = [
    { value: "all", label: "All" },
    { value: "Web Development", label: "Web Dev" },
    { value: "AI & Technology", label: "AI" },
    { value: "Programming", label: "Code" },
    { value: "UI/UX Design", label: "Design" },
    { value: "Personal Growth", label: "Personal Growth" },
    { value: "Best Practices", label: "Best Practices" },
  ]

  if (loading && blogs.length === 0) {
    return (
      <div className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="h-10 bg-muted rounded w-48 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="bg-muted rounded-lg aspect-video animate-pulse"></div>
                <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error && blogs.length === 0) {
    return (
      <div className="w-full py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Blog</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="max-w-6xl mx-auto py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Latest articles
          </h4>
          
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Article */}
          {blogs.length > 0 && (
            <Link
              href={`/blogs/${blogs[0].id}`}
              className="flex flex-col gap-4 hover:opacity-75 cursor-pointer md:col-span-2"
            >
              <div className="bg-muted rounded-md aspect-video overflow-hidden relative">
                {blogs[0].featuredImage && (
                  <Image
                    src={blogs[0].featuredImage}
                    alt={blogs[0].title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                    unoptimized
                  />
                )}
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Badge>{blogs[0].category}</Badge>
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span className="text-muted-foreground">By</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={blogs[0].authorAvatar} />
                    <AvatarFallback>{blogs[0].author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{blogs[0].author}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{formatDate(blogs[0].publishedAt)}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="max-w-3xl text-4xl tracking-tight">
                  {blogs[0].title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {blogs[0].excerpt}
                </p>
              </div>
            </Link>
          )}

          {/* Other Articles */}
          {blogs.slice(1).map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="flex flex-col gap-4 hover:opacity-75 cursor-pointer"
            >
              <div className="bg-muted rounded-md aspect-video overflow-hidden relative">
                {blog.featuredImage && (
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                    unoptimized
                  />
                )}
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Badge>{blog.category}</Badge>
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span className="text-muted-foreground">By</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={blog.authorAvatar} />
                    <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{blog.author}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{formatDate(blog.publishedAt)}</span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="max-w-3xl text-2xl tracking-tight">
                  {blog.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  )
}

export { Blog }
