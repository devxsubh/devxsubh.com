import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Portfolio } from '@/utils/interface';

interface PortfolioState {
  data: Portfolio | null;
  loading: boolean;
  error: string | null;
  selectedProject: string | null;
  selectedSkill: string | null;
  contactForm: {
    name: string;
    email: string;
    message: string;
    subject: string;
  };
  isContactFormSubmitting: boolean;
}

const initialState: PortfolioState = {
  data: null,
  loading: false,
  error: null,
  selectedProject: null,
  selectedSkill: null,
  contactForm: {
    name: '',
    email: '',
    message: '',
    subject: '',
  },
  isContactFormSubmitting: false,
};

// Async thunk for loading portfolio data
export const loadPortfolioData = createAsyncThunk(
  'portfolio/loadData',
  async (_, { rejectWithValue }) => {
    try {
      const portfolio = (await import("@/dummy.json")).default;
      return portfolio as Portfolio;
    } catch (error) {
      return rejectWithValue('Failed to load portfolio data');
    }
  }
);

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  'portfolio/submitContact',
  async (formData: {
    name: string;
    email: string;
    message: string;
    subject: string;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to submit contact form');
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string | null>) => {
      state.selectedProject = action.payload;
    },
    setSelectedSkill: (state, action: PayloadAction<string | null>) => {
      state.selectedSkill = action.payload;
    },
    updateContactForm: (state, action: PayloadAction<Partial<PortfolioState['contactForm']>>) => {
      state.contactForm = { ...state.contactForm, ...action.payload };
    },
    resetContactForm: (state) => {
      state.contactForm = {
        name: '',
        email: '',
        message: '',
        subject: '',
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loadPortfolioData
      .addCase(loadPortfolioData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPortfolioData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadPortfolioData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // submitContactForm
      .addCase(submitContactForm.pending, (state) => {
        state.isContactFormSubmitting = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isContactFormSubmitting = false;
        state.contactForm = {
          name: '',
          email: '',
          message: '',
          subject: '',
        };
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isContactFormSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedProject,
  setSelectedSkill,
  updateContactForm,
  resetContactForm,
  clearError,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
