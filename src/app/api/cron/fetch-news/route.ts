import { NextResponse } from 'next/server';
import { NewsService } from '@/lib/newsService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Verify the request is from a legitimate cron service
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🕐 Cron job triggered: Fetching news...');
    
    // Fetch and store news
    const fetchResult = await NewsService.fetchAndStoreNews();
    
    // Clean up old news (older than 7 days)
    const cleanupResult = await NewsService.cleanupOldNews(7);
    
    console.log('✅ Cron job completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'News fetch and cleanup completed',
      fetch: fetchResult,
      cleanup: {
        articlesDeactivated: cleanupResult
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Cron job failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch and store news',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Also support POST for webhook-style triggers
export async function POST(request: Request) {
  return GET(request);
}
