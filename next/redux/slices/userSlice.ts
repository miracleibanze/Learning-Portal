import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@type/User"; // Import the simplified UserType
import axios from "axios";

// Define the initial state
export interface UserState {
  randomUsers: {
    data: UserType[];
    loading: boolean;
    error: string | null;
  };
  allUsers: {
    students: UserType[];
    teachers: UserType[];
    loading: boolean;
    error: string | null;
  };
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
  randomUsers: {
    data: [],
    loading: false,
    error: null,
  },
  allUsers: {
    students: [],
    teachers: [],
    loading: false,
    error: null,
  },
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch random user data
export const fetchRandomUsers = createAsyncThunk(
  "user/fetchRandomUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "user/fetchStudents",
  async ({ index }: { index: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/users?role=student&index=${index}`
      );
      return response.data as UserType[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch teachers (instructors)
export const fetchTeachers = createAsyncThunk(
  "user/fetchTeachers",
  async ({ index }: { index: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/users?role=instructor&index=${index}`
      );
      return response.data as UserType[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (updates: Partial<UserType>, { rejectWithValue }) => {
    try {
      console.log("updating user ...", updates);
      const response = await axios.put(`/api/user`, updates);
      updateUserField(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateOtherUserField = createAsyncThunk(
  "user/updateUserInfo",
  async (
    { updates, userId }: { updates: Partial<UserType>; userId: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("updating user ...", updates);
      const response = await axios.put(`/api/user?userId=${userId}`, updates);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDetailedUser = createAsyncThunk(
  "user/fetchDetailedUser",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user?username=${username}`);
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
      console.log("changes being made on user : ", action.payload);
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
      .addCase(fetchRandomUsers.pending, (state) => {
        state.randomUsers.loading = true;
        state.randomUsers.error = null;
      })
      .addCase(
        fetchRandomUsers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.randomUsers.loading = false;
          state.randomUsers.data = action.payload;
        }
      )
      .addCase(
        fetchRandomUsers.rejected,
        (state, action: PayloadAction<any>) => {
          state.randomUsers.loading = false;
          state.randomUsers.error =
            action.payload?.message || "Failed to fetch user";
        }
      )
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.allUsers.loading = true;
        state.allUsers.error = null;
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.allUsers.loading = false;
          state.allUsers.students = action.payload;
        }
      )
      .addCase(fetchStudents.rejected, (state, action: PayloadAction<any>) => {
        state.allUsers.loading = false;
        state.allUsers.error =
          action.payload?.message || "Failed to fetch students";
      })

      // Fetch Teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.allUsers.loading = true;
        state.allUsers.error = null;
      })
      .addCase(
        fetchTeachers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.allUsers.loading = false;
          state.allUsers.teachers = action.payload;
        }
      )
      .addCase(fetchTeachers.rejected, (state, action: PayloadAction<any>) => {
        state.allUsers.loading = false;
        state.allUsers.error =
          action.payload?.message || "Failed to fetch teachers";
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
