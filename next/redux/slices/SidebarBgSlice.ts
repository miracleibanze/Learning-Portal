import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
export interface UserState {}

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
});

// Export actions
export const { updateUserField } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
