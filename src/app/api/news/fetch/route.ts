import { NextResponse } from 'next/server';
import { NewsService } from '@/lib/newsService';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    console.log('Starting news fetch process...');
    const result = await NewsService.fetchAndStoreNews();
    
    return NextResponse.json({
      success: true,
      message: 'News fetch completed successfully',
      ...result
    });
  } catch (error) {
    console.error('Error in news fetch process:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch and store news',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Clean up old news (older than 7 days)
    const cleanedCount = await NewsService.cleanupOldNews(7);
    
    return NextResponse.json({
      success: true,
      message: 'News cleanup completed',
      cleanedCount
    });
  } catch (error) {
    console.error('Error in news cleanup:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to cleanup old news'
      },
      { status: 500 }
    );
  }
}
