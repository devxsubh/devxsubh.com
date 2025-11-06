import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    ui: uiReducer,
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
