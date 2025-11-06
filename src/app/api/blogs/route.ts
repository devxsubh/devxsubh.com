import { NextResponse } from 'next/server';
import blogsData from '@/data/blogs.json';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured') || undefined;

    let blogs = blogsData.blogs;

    // Filter by category
    if (category && category !== 'all') {
      blogs = blogs.filter(blog => 
        blog.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by featured
    if (featured === 'true') {
      blogs = blogs.filter(blog => blog.featured);
    }

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      blogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by published date (newest first)
    blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Pagination
    const total = blogs.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);

    return NextResponse.json({
      blogs: paginatedBlogs,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
