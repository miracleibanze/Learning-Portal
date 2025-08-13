import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IAnalyticsData {
  totalCourses: number;
  publishedCount: number;
  draftCount: number;
  totalStudents: number;
  averageRating: number;
  monthlyCourseCounts: { month: string; count: number }[];
}
// Define the AnalyticsState using the mutable types
interface AnalyticsState {
  data: IAnalyticsData | null;
  loading: boolean;
  error: any;
}

// Initial state
const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk action to fetch pending analytics
export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/analytics`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Error fetching pending analytics"
      );
    }
  }
);

// Analytics slice creation
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Exporting actions
// export const {
//   setpendingAnalyticss,
//   setSubmittedAnalyticss,
//   setCreatedAnalyticss,
// } = analyticsSlice.actions;

export default analyticsSlice.reducer;
