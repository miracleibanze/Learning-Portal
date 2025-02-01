import { myUser } from "@components/constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the type for the user
export interface User {
  userId?: string;
  names: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  profile?: {
    image: string;
    address?: string;
    interests?: string[];
  };
}

// Mock user data
const mockUser: User = myUser;

// Initial state
interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// Thunk for fetching user data from an API
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      return response.data;
    } catch (error) {
      // If the request fails, we will return a default mock user as fallback
      console.error("Failed to fetch user data:", error);
      return mockUser; // Returning the mock user when there's an error
    }
  }
);

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error as Error).message; // Type casting here for better safety
        // In case of rejection, we also set the mock user
        state.user = mockUser;
      });
  },
});

export default userSlice.reducer;
