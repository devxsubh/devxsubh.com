import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  url: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  urlToImage: {
    type: String,
    default: null
  },
  publishedAt: {
    type: Date,
    required: true,
    index: true
  },
  source: {
    name: {
      type: String,
      required: true,
      index: true
    },
    id: String
  },
  author: {
    type: String,
    default: null
  },
  category: {
    type: String,
    default: 'technology',
    index: true
  },
  content: {
    type: String,
    default: null
  },
  fetchedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for efficient querying
newsSchema.index({ category: 1, publishedAt: -1 });
newsSchema.index({ fetchedAt: 1, isActive: 1 });

// Text search index
newsSchema.index({ 
  title: 'text', 
  description: 'text', 
  content: 'text' 
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;
