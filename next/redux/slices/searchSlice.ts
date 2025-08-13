import { DetailedCourseDocument } from "@lib/models/Course";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@type/User"; // Import the simplified UserType
import axios from "axios";

// Define the initial state
export interface searchState {
  people: {
    data: {
      _id: string;
      name: string;
      email: string;
      username: string;
      about: string;
      role: string;
      picture?: string;
    }[];
    loading: boolean;
    error: any | null;
  };
  courses: {
    data: DetailedCourseDocument[];
    loading: boolean;
    error: any | null;
  };
  context: string;
}

const initialState: searchState = {
  people: {
    data: [],
    loading: false,
    error: null,
  },
  courses: {
    data: [],
    loading: false,
    error: null,
  },
  context: "",
};

export const fetchPeople = createAsyncThunk(
  "search/fetchPeople",
  async (
    { query, index }: { query: string; index: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `/api/users?q=${encodeURIComponent(query)}&index=${index}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

export const fetchCourses = createAsyncThunk(
  "search/fetchCourses",
  async (
    { query, index }: { query: string; index: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `/api/courses?q=${encodeURIComponent(query)}&index=${index}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// Create the user slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchingContext: (state, action) => {
      state.context = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch user
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.people.loading = true;
        state.people.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action: PayloadAction<any>) => {
        state.people.loading = false;
        state.people.data = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action: PayloadAction<any>) => {
        state.people.loading = false;
        state.people.error = action.payload?.message || "Failed to fetch user";
      })
      .addCase(fetchCourses.pending, (state) => {
        state.courses.loading = true;
        state.courses.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<any>) => {
        state.courses.loading = false;
        state.courses.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action: PayloadAction<any>) => {
        state.courses.loading = false;
        state.courses.error =
          action.payload?.message || "Failed to fetch courses";
      });
  },
});

export const { setSearchingContext } = searchSlice.actions;

export default searchSlice.reducer;
