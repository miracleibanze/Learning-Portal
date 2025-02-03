import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Community {
  _id?: string;
  name: string;
  description: string;
  category: string;
  visibility: string;
  members: number;
  listOfMembers?: [
    {
      names: string;
      image: string;
      title: string;
      userId: string;
    }
  ];
  createdAt?: string;
}

interface CommunityState {
  communities: Community[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CommunityState = {
  communities: [],
  loading: false,
  error: null,
  success: false,
};

// Fetch all communities
export const fetchCommunities = createAsyncThunk(
  "community/fetchCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/communities");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch communities"
      );
    }
  }
);

// Create a new community
export const createCommunity = createAsyncThunk(
  "community/createCommunity",
  async (communityData: Community, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/communities",
        communityData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create community"
      );
    }
  }
);

// Update a community
export const updateCommunity = createAsyncThunk(
  "community/updateCommunity",
  async (
    { id, updatedData }: { id: string; updatedData: Community },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/api/communities/${id}`,
        updatedData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update community"
      );
    }
  }
);

// Delete a community
export const deleteCommunity = createAsyncThunk(
  "community/deleteCommunity",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/communities/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete community"
      );
    }
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch communities
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create community
      .addCase(createCommunity.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.communities.push(action.payload);
      })
      .addCase(createCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update community
      .addCase(updateCommunity.fulfilled, (state, action) => {
        state.communities = state.communities.map((community) =>
          community._id === action.payload._id ? action.payload : community
        );
      })
      // Delete community
      .addCase(deleteCommunity.fulfilled, (state, action) => {
        state.communities = state.communities.filter(
          (community) => community._id !== action.payload
        );
      });
  },
});

export default communitySlice.reducer;
