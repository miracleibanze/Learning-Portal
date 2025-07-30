import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@type/User"; // Import the simplified UserType
import axios from "axios";

// Define the initial state
export interface UserState {
  detailedUser: {
    data: UserType | null;
    loading: boolean;
    error: string | null;
  };
  user: UserType | null;
  loadingUser: boolean;
  error: string | null;
}

const initialState: UserState = {
  detailedUser: {
    data: null,
    loading: false,
    error: null,
  },
  user: null,
  loadingUser: false,
  error: null,
};

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (updates: Partial<UserType>, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/user`, updates);
      updateUserField(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDetailedUser = createAsyncThunk(
  "user/fetchDetailedUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/user`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update user progress
export const updateUserProgress = createAsyncThunk(
  "user/updateUserProgress",
  async (
    {
      userId,
      courseId,
      completedModules,
    }: { userId: string; courseId: string; completedModules: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/api/user/progress`, {
        courseId,
        completedModules,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Sync action to update any field of the user object
    updateUserField: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch user
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loadingUser = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.loadingUser = false;
        state.error = action.payload?.message || "Failed to fetch user";
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(
        updateUserInfo.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loadingUser = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.loadingUser = false;
        state.error = action.payload?.message || "Failed to update user info";
      })

      .addCase(updateUserProgress.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(
        updateUserProgress.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loadingUser = false;
          state.user = action.payload;
        }
      )
      .addCase(
        updateUserProgress.rejected,
        (state, action: PayloadAction<any>) => {
          state.loadingUser = false;
          state.error = action.payload?.message || "Failed to update progress";
        }
      )
      .addCase(fetchDetailedUser.pending, (state) => {
        state.detailedUser.loading = true;
      })
      .addCase(
        fetchDetailedUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.detailedUser.data = action.payload;
          state.detailedUser.loading = false;
        }
      )
      .addCase(
        fetchDetailedUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.detailedUser.error =
            action.payload?.message || "Failed to update detailed User";
        }
      );
  },
});

// Export actions
export const { updateUserField } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
