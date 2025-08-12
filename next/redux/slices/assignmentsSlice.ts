import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IAssignment, Question } from "@type/Assignment"; // Your original IAssignment
import axios from "axios";
import { User } from "next-auth";

// Define a mutable version of IAssignment
export interface MutableAssignment {
  _id: string;
  title: string;
  description: string;
  instructor: User;
  type: "quiz" | "coding";
  deadline: Date;
  createdAt: Date;
  students: string[];
  createdBy: {
    id: string;
    name: string;
    about?: string;
    picture?: string;
    role: string;
  };
  courseId: string; // Simplified courseId type
  questions?: Question[];
  codeInstructions?: string;
  marks?: [{ id: string; name: string; marks: string }];
}

// Define the AssignmentState using the mutable types
interface AssignmentState {
  pendingAssignments: {
    data: MutableAssignment[];
    loading: boolean;
    error: any;
  };
  submittedAssignments: {
    data: string[];
    status: "loading" | "set" | "error";
  };
  createdAssignments: {
    data: MutableAssignment[];
    status: "loading" | "set" | "error";
  };
  doneAssignmentsList: string[];
}

// Initial state
const initialState: AssignmentState = {
  pendingAssignments: { data: [], loading: false, error: null },
  submittedAssignments: { data: [], status: "loading" },
  createdAssignments: { data: [], status: "loading" },
  doneAssignmentsList: [],
};

// Thunk action to fetch pending assignments
export const fetchpendingAssignments = createAsyncThunk(
  "assignment/fetchpendingAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/assignments/pending`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Error fetching pending assignments"
      );
    }
  }
);
// Thunk action to fetch assignments created by the instructor
export const fetchCreatedAssignments = createAsyncThunk(
  "assignment/fetchCreatedAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/assignments`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Error fetching created assignments"
      );
    }
  }
);

// Assignment slice creation
const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    // Set pending assignments and update status
    setpendingAssignments(state, action: PayloadAction<MutableAssignment[]>) {
      state.pendingAssignments.data = action.payload;
      state.pendingAssignments.loading = false;
    },
    // Set submitted assignments and update status
    setSubmittedAssignments(state, action: PayloadAction<string[]>) {
      state.submittedAssignments.data = action.payload;
      state.submittedAssignments.status = "set";
    },
    // Set created assignments and update status
    setCreatedAssignments(state, action: PayloadAction<MutableAssignment[]>) {
      state.createdAssignments.data = action.payload;
      state.createdAssignments.status = "set";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchpendingAssignments.pending, (state) => {
        state.pendingAssignments.loading = true;
      })
      .addCase(fetchpendingAssignments.fulfilled, (state, action) => {
        state.pendingAssignments.data = action.payload;
        state.pendingAssignments.loading = false;
      })
      .addCase(fetchpendingAssignments.rejected, (state, action) => {
        state.pendingAssignments.error = action.payload;
        state.pendingAssignments.loading = false;
      })
      .addCase(fetchCreatedAssignments.pending, (state) => {
        state.createdAssignments.status = "loading";
      })
      .addCase(fetchCreatedAssignments.fulfilled, (state, action) => {
        state.createdAssignments.data = action.payload;
        state.createdAssignments.status = "set";
      })
      .addCase(fetchCreatedAssignments.rejected, (state) => {
        state.createdAssignments.status = "error";
      });
  },
});

// Exporting actions
export const {
  setpendingAssignments,
  setSubmittedAssignments,
  setCreatedAssignments,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
