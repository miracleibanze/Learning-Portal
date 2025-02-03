import axiosInstance from "@components/features/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Define the type for the user
export interface User {
  userId?: string;
  names: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  title: string;
  about?: string;
  profile?: {
    image: string;
    address?: string;
    interests?: string[];
    age?: number;
    country?: string;
    educationLevel?: string;
    skills?: string[];
  };
  experience?: {
    position: string;
    field: string;
    company: string;
    duration: {
      start: string;
      end: string;
    };
    description: string;
  };

  engagementStats?: {
    pointsEarned?: number;
    badges?: string[];
    completedChallenges?: number;
    feedbackReceived?: object[];
  };

  umuravaIntegration?: {
    umuravaUserId?: string;
    linkedAccounts?: {
      github?: string;
      linkedin?: string;
    };
  };

  audit?: {
    createdAt?: string;
    updatedAt?: string;
  };
}

// Initial state
interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  status: "idle",
  error: null,
};

// Thunk for fetching user data from an API
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/api/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.userId = action.payload;
      } else {
        state.user = { userId: action.payload } as User;
      }
      localStorage.setItem("userId", action.payload); // Store in localStorage
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store full user data in localStorage
      localStorage.setItem("userId", JSON.stringify(action.payload.userId)); // Store full user data in localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("user"); // Remove full user data from localStorage on logout
    },
  },
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
        state.error = (action.error as Error).message;
      });
  },
});

export const { setUserId, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
