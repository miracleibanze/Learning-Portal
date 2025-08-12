import { IJoinRequest } from "@lib/models/JoinRequest";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the JoinRequestState using the mutable types
interface JoinRequestState {
  data: IJoinRequest[];
  loading: boolean;
  error: any;
}

// Initial state
const initialState: JoinRequestState = {
  data: [],
  loading: false,
  error: null,
};

// Thunk action to fetch pending assignments
export const fetchJoinRequests = createAsyncThunk(
  "joinRequest/fetchjoinrequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/courses/join-request`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Error fetching pending joinRequest"
      );
    }
  }
);

// Assignment slice creation
const assignmentSlice = createSlice({
  name: "joinRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoinRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJoinRequests.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchJoinRequests.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Exporting actions
// export const {
//   setpendingAssignments,
//   setSubmittedAssignments,
//   setCreatedAssignments,
// } = assignmentSlice.actions;

export default assignmentSlice.reducer;
