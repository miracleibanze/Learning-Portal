import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Analytic {
  title: string;
  count: number;
  percentage: number;
  icon: string;
}

const analytics: Analytic[] = [
  {
    title: "Total Challenges",
    count: 0,
    percentage: 0,
    icon: "fa-book",
  },
  {
    title: "Total Participants",
    count: 0,
    percentage: 0,
    icon: "fa-users",
  },
  {
    title: "Completed Challenges",
    count: 0,
    percentage: 0,
    icon: "fa-book",
  },
  {
    title: "Open Challenges",
    count: 0,
    percentage: 0,
    icon: "fa-book",
  },
  {
    title: "Ongoing Challenges",
    count: 0,
    percentage: 0,
    icon: "fa-book",
  },
];

interface AnalyticState {
  analytics: Analytic[];
  loadingAnalytics: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AnalyticState = {
  analytics: [],
  loadingAnalytics: false,
  error: null,
  success: false,
};

// Fetch analytics
export const fetchAnalytics = createAsyncThunk(
  "analytic/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetching analytics");
      const response = await axiosInstance.get("/api/analytics");
      return response.data || analytics;
    } catch (error: any) {
      console.log("fetching analytics failed");
      return analytics; // Use static data if API fails
    }
  }
);

// Create a new analytic
export const createAnalytic = createAsyncThunk(
  "analytic/createAnalytic",
  async (analyticData: Analytic, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/analytics", analyticData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create analytic"
      );
    }
  }
);

// Edit an existing analytic
export const editAnalytic = createAsyncThunk(
  "analytic/editAnalytic",
  async (
    {
      analyticId,
      updatedData,
    }: { analyticId: string; updatedData: Analytic | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/api/analytics/${analyticId}`,
        updatedData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update analytic"
      );
    }
  }
);

const analyticSlice = createSlice({
  name: "analytic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.loadingAnalytics = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loadingAnalytics = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loadingAnalytics = false;
        state.error = action.payload as string;
      })

      // Create Analytic
      .addCase(createAnalytic.pending, (state) => {
        state.loadingAnalytics = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAnalytic.fulfilled, (state, action) => {
        state.loadingAnalytics = false;
        state.success = true;
        state.analytics.push(action.payload);
      })
      .addCase(createAnalytic.rejected, (state, action) => {
        state.loadingAnalytics = false;
        state.error = action.payload as string;
      })

      // Edit Analytic
      .addCase(editAnalytic.pending, (state) => {
        state.loadingAnalytics = true;
        state.error = null;
      })
      .addCase(editAnalytic.fulfilled, (state, action) => {
        state.loadingAnalytics = false;
        state.success = true;
        state.analytics = state.analytics.map((analytic) =>
          analytic.title === action.payload.title ? action.payload : analytic
        );
      })
      .addCase(editAnalytic.rejected, (state, action) => {
        state.loadingAnalytics = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticSlice.reducer;
