import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAnnouncement } from "@type/Announcement";
import axios from "axios";

interface announcementState {
  announcements: IAnnouncement[];
  loadingAnnouncements: boolean;
  error: any;
}

const initialState: announcementState = {
  announcements: [],
  loadingAnnouncements: false,
  error: null,
};
// Async thunk for fetching announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/announcements");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch announcements"
      );
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loadingAnnouncements = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loadingAnnouncements = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state: any, action) => {
        state.loadingAnnouncements = false;
        state.error = action.payload;
      });
  },
});

export default announcementSlice.reducer;
