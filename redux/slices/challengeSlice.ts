import { challenges } from "@components/constants";
import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Participants {
  name: string;
  role: string;
}

export interface Challenge {
  _id?: string;
  title?: string;
  email?: string;
  category?: string;
  skills?: string[];
  difficulty?: string;
  deadline?: string;
  description?: string;
  duration?: string;
  prize?: string;
  participants?: Participants[];
  projectRequirements?: string[];
  projectDesign?: string[];
  tasks?: string[];
  tools?: string[];
  brief?: string;
  deliverables?: string[];
  status?: "open" | "ongoing" | "completed";
}

interface ChallengeState {
  challenges: Challenge[];
  loadingChallenges: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ChallengeState = {
  challenges: [],
  loadingChallenges: false,
  error: null,
  success: false,
};

// Fetch challenges
export const fetchChallenges = createAsyncThunk(
  "challenge/fetchChallenges",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetching challenges");
      const response = await axiosInstance.get("/api/challenges");
      return response.data || challenges;
    } catch (error: any) {
      console.log("fetching challenges failed");
      return challenges; // Use static data if API fails
    }
  }
);

// Create a new challenge
export const createChallenge = createAsyncThunk(
  "challenge/createChallenge",
  async (challengeData: Challenge, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/challenges",
        challengeData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create challenge"
      );
    }
  }
);

// Edit an existing challenge
export const editChallenge = createAsyncThunk(
  "challenge/editChallenge",
  async (
    {
      challengeId,
      updatedData,
    }: { challengeId: string; updatedData: Challenge | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/api/challenges/${challengeId}`,
        updatedData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update challenge"
      );
    }
  }
);

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Challenges
      .addCase(fetchChallenges.pending, (state) => {
        state.loadingChallenges = true;
        state.error = null;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.loadingChallenges = false;
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.loadingChallenges = false;
        state.error = action.payload as string;
      })

      // Create Challenge
      .addCase(createChallenge.pending, (state) => {
        state.loadingChallenges = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createChallenge.fulfilled, (state, action) => {
        state.loadingChallenges = false;
        state.success = true;
        state.challenges.push(action.payload);
      })
      .addCase(createChallenge.rejected, (state, action) => {
        state.loadingChallenges = false;
        state.error = action.payload as string;
      })

      // Edit Challenge
      .addCase(editChallenge.pending, (state) => {
        state.loadingChallenges = true;
        state.error = null;
      })
      .addCase(editChallenge.fulfilled, (state, action) => {
        state.loadingChallenges = false;
        state.success = true;
        state.challenges = state.challenges.map((challenge) =>
          challenge._id === action.payload._id ? action.payload : challenge
        );
      })
      .addCase(editChallenge.rejected, (state, action) => {
        state.loadingChallenges = false;
        state.error = action.payload as string;
      });
  },
});

export default challengeSlice.reducer;
