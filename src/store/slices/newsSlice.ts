import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface NewsArticle {
  _id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
  category?: string;
}

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  searchQuery: string;
  selectedCategory: string;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalArticles: 0,
  searchQuery: '',
  selectedCategory: 'all',
};

// Async thunk for fetching news
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page = 1, limit = 10000, search = '', category = '' }: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (search) params.append('search', search);
      if (category && category !== 'all') params.append('category', category);

      const response = await fetch(`/api/news?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch news');
    }
  }
);

// Async thunk for fetching and storing news
export const fetchAndStoreNews = createAsyncThunk(
  'news/fetchAndStoreNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/news/fetch', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch and store news');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch and store news');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearNews: (state) => {
      state.articles = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchNews
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles || [];
        state.totalPages = action.payload.totalPages || 1;
        state.totalArticles = action.payload.total || 0;
        state.currentPage = action.payload.page || 1;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetchAndStoreNews
      .addCase(fetchAndStoreNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAndStoreNews.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update articles if the fetch was successful
      })
      .addCase(fetchAndStoreNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, setSelectedCategory, setCurrentPage, clearNews } = newsSlice.actions;
export default newsSlice.reducer;
