import News from './newsModel';
import { connectToDatabase } from './db';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
    id?: string;
  };
  author?: string;
  content?: string;
}

export class NewsService {
  private static async fetchFromNewsAPI(apiKey: string, pageSize: number = 100): Promise<NewsArticle[]> {
    const categories = ['technology', 'business', 'software', 'ai', 'ml', 'automation', 'ycombinator', 'startup', 'it'];
    const countries = ['us', 'gb', 'in'];
    let allArticles: NewsArticle[] = [];

    for (const category of categories) {
      for (const country of countries) {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${Math.min(pageSize, 100)}`
          );

          if (!response.ok) {
            console.warn(`Failed to fetch ${category} news for ${country}: ${response.status}`);
            continue;
          }

          const data = await response.json();
          if (data.articles && Array.isArray(data.articles)) {
            allArticles = allArticles.concat(data.articles);
          }

          // Rate limiting - wait 1 second between requests
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Error fetching ${category} news for ${country}:`, error);
        }
      }
    }

    return allArticles;
  }

  private static async fetchFromGNews(apiKey: string, maxArticles: number = 100): Promise<NewsArticle[]> {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&max=${maxArticles}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`GNews API error: ${response.status}`);
      }

      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('Error fetching from GNews:', error);
      return [];
    }
  }

  private static async fetchFromHackerNews(): Promise<NewsArticle[]> {
    try {
      // Get top story IDs
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const storyIds = await response.json();
      
      // Get first 50 stories
      const storyPromises = storyIds.slice(0, 50).map(async (id: number) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyResponse.json();
      });

      const stories = await Promise.all(storyPromises);
      
      return stories
        .filter((story: any) => story && story.title && story.url)
        .map((story: any) => ({
          title: story.title,
          description: story.title, // Hacker News doesn't have descriptions
          url: story.url,
          urlToImage: undefined,
          publishedAt: new Date(story.time * 1000).toISOString(),
          source: { name: 'Hacker News' },
          author: story.by || 'Anonymous'
        }));
    } catch (error) {
      console.error('Error fetching from Hacker News:', error);
      return [];
    }
  }

  private static async storeArticles(articles: NewsArticle[]): Promise<{ stored: number; skipped: number }> {
    await connectToDatabase();
    
    let stored = 0;
    let skipped = 0;

    for (const article of articles) {
      try {
        // Skip articles without images or descriptions
        if (!article.urlToImage || article.urlToImage.trim() === '' || !article.description || article.description.trim() === '') {
          skipped++;
          continue;
        }

        // Check if article already exists
        const existing = await News.findOne({ url: article.url });
        if (existing) {
          skipped++;
          continue;
        }

        // Create new article
        const newsArticle = new News({
          title: article.title,
          description: article.description || article.title, // Fallback to title if no description
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: new Date(article.publishedAt),
          source: article.source,
          author: article.author,
          content: article.content,
          category: 'technology', // Default category
          fetchedAt: new Date(),
          isActive: true
        });

        await newsArticle.save();
        stored++;
      } catch (error) {
        console.error('Error storing article:', error);
        skipped++;
      }
    }

    return { stored, skipped };
  }

  public static async fetchAndStoreNews(): Promise<{ total: number; stored: number; skipped: number }> {
    console.log('Starting news fetch and store process...');
    
    let allArticles: NewsArticle[] = [];
    const apiKey = process.env.NEWS_API_KEY;
    const gnewsKey = process.env.GNEWS_API_KEY;

    // Fetch from multiple sources
    if (apiKey) {
      console.log('Fetching from NewsAPI...');
      const newsApiArticles = await this.fetchFromNewsAPI(apiKey, 100);
      allArticles = allArticles.concat(newsApiArticles);
      console.log(`Fetched ${newsApiArticles.length} articles from NewsAPI`);
    }

    if (gnewsKey) {
      console.log('Fetching from GNews...');
      const gnewsArticles = await this.fetchFromGNews(gnewsKey, 50);
      allArticles = allArticles.concat(gnewsArticles);
      console.log(`Fetched ${gnewsArticles.length} articles from GNews`);
    }

    // Skip Hacker News since it doesn't provide images
    // console.log('Skipping Hacker News (no images available)...');

    // Remove duplicates based on URL
    const uniqueArticles = allArticles.filter((article, index, self) => 
      index === self.findIndex(a => a.url === article.url)
    );

    console.log(`Total unique articles: ${uniqueArticles.length}`);

    // Store articles in database
    const result = await this.storeArticles(uniqueArticles);
    
    console.log(`News fetch complete: ${result.stored} stored, ${result.skipped} skipped`);
    
    return {
      total: uniqueArticles.length,
      stored: result.stored,
      skipped: result.skipped
    };
  }

  public static async getNews(page: number = 1, limit: number = 20, category?: string): Promise<{
    articles: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await connectToDatabase();

    const query: any = { isActive: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    
    const [articles, total] = await Promise.all([
      News.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments(query)
    ]);

    return {
      articles,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  public static async searchNews(query: string, page: number = 1, limit: number = 20): Promise<{
    articles: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await connectToDatabase();

    const searchQuery = {
      isActive: true,
      $text: { $search: query }
    };

    const skip = (page - 1) * limit;
    
    const [articles, total] = await Promise.all([
      News.find(searchQuery)
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments(searchQuery)
    ]);

    return {
      articles,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  public static async cleanupOldNews(daysToKeep: number = 7): Promise<number> {
    await connectToDatabase();
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const result = await News.updateMany(
      { fetchedAt: { $lt: cutoffDate } },
      { $set: { isActive: false } }
    );
    
    return result.modifiedCount;
  }
}
