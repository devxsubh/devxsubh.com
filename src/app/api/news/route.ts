import { NextResponse } from 'next/server';
import { NewsService } from '@/lib/newsService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    let result;
    
    if (search) {
      result = await NewsService.searchNews(search, page, limit);
    } else {
      result = await NewsService.getNews(page, limit, category);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
