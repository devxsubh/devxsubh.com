import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import News from '@/lib/newsModel';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('📊 Checking news status...');
    
    // Connect to database
    await connectToDatabase();
    
    // Get news statistics
    const totalArticles = await News.countDocuments();
    const activeArticles = await News.countDocuments({ isActive: true });
    const todayArticles = await News.countDocuments({
      fetchedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    // Get latest article
    const latestArticle = await News.findOne({ isActive: true })
      .sort({ publishedAt: -1 })
      .select('title publishedAt source')
      .lean();
    
    console.log('✅ Status check completed');
    
    return NextResponse.json({
      success: true,
      database: 'Connected',
      statistics: {
        totalArticles,
        activeArticles,
        todayArticles,
        latestArticle
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Status check failed:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Status check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
