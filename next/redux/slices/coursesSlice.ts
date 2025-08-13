import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ChapterDocument,
  CourseDocument,
  DetailedCourseDocument,
} from "@lib/models/Course";

// Async action to fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/courses"); // Use GET method
      const data = response.data;

      if (data.success) {
        return data.data; // Return courses data
      } else {
        return rejectWithValue(data.message); // Return error message
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  }
);

// Async action to fetch top 4 courses
export const fetchTop4Courses = createAsyncThunk(
  "courses/fetchTop4Courses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/courses"); // Use POST method
      const data = response.data;

      if (data.success) {
        return data.data; // Return top 4 courses data
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch top 4 courses"
      );
    }
  }
);

export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMyCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/my-courses`); // Use POST method
      const data = response.data;

      if (data.success) {
        return data.data; // Return top 4 courses data
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my courses"
      );
    }
  }
);

export const fetchCoursesToEnroll = createAsyncThunk(
  "courses/fetchCoursesToEnroll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/my-courses`); // Use POST method
      const data = response.data;

      if (data.success) {
        return data.data; // Return top 4 courses data
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my courses"
      );
    }
  }
);

export const fetchCoursesCreated = createAsyncThunk(
  "courses/fetchCoursesCreated",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/instructor/courses`);
      const data = response.data;

      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my courses"
      );
    }
  }
);
export const fetchDetailedCourse = createAsyncThunk(
  "courses/fetchDetailedCourse",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/courses/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch detailed course"
      );
    }
  }
);
export const fetchDetailedCourseChapters = createAsyncThunk(
  "courses/fetchDetailedCourseChapters",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/courses/chapters/${courseId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch detailed course"
      );
    }
  }
);
export const fetchPublishedCourses = createAsyncThunk(
  "courses/fetchPublishedCourses",
  async ({ index }: { index: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/courses?status=Published&index=${index}`
      );
      return response.data as CourseDocument[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch published courses"
      );
    }
  }
);

export const fetchDraftCourses = createAsyncThunk(
  "courses/fetchDraftCourses",
  async ({ index }: { index: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/courses?status=Draft&index=${index}`
      );
      return response.data as CourseDocument[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch draft courses"
      );
    }
  }
);

interface CourseState {
  courses: {
    data: DetailedCourseDocument[];
    coursesLoading: boolean;
    coursesError: any;
  };
  top4Courses: {
    data: DetailedCourseDocument[];
    top4CoursesLoading: boolean;
    top4CoursesError: any;
  };
  myCourses: {
    data: DetailedCourseDocument[];
    myCourseLoading: boolean;
    myCourseError: any;
  };
  coursesToEnroll: {
    data: DetailedCourseDocument[];
    coursesToEnrollLoading: boolean;
    coursesToEnrollError: any;
  };
  coursesCreated: {
    data: DetailedCourseDocument[];
    coursesCreatedLoading: boolean;
    coursesCreatedError: any;
  };
  detailedCourse: {
    data: DetailedCourseDocument | null;
    detailedCourseLoading: boolean;
    detailedCourseError: any;
  };
  detailedCourseChapters: {
    data: { chapters: ChapterDocument[] };
    detailedCourseChaptersLoading: boolean;
    detailedCourseChaptersError: any;
  };

  publishedCourses: {
    data: DetailedCourseDocument[];
    loading: boolean;
    error: string | null;
  };
  draftCourses: {
    data: DetailedCourseDocument[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: CourseState = {
  courses: {
    data: [],
    coursesLoading: false,
    coursesError: null,
  },

  top4Courses: {
    data: [],
    top4CoursesLoading: false,
    top4CoursesError: null,
  },

  myCourses: {
    data: [],
    myCourseLoading: false,
    myCourseError: null,
  },
  coursesToEnroll: {
    data: [],
    coursesToEnrollLoading: false,
    coursesToEnrollError: null,
  },
  coursesCreated: {
    data: [],
    coursesCreatedLoading: false,
    coursesCreatedError: null,
  },
  detailedCourse: {
    data: null,
    detailedCourseLoading: true,
    detailedCourseError: null,
  },
  detailedCourseChapters: {
    data: { chapters: [] },
    detailedCourseChaptersLoading: true,
    detailedCourseChaptersError: null,
  },
  publishedCourses: {
    data: [],
    loading: false,
    error: null,
  },
  draftCourses: {
    data: [],
    loading: false,
    error: null,
  },
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    toggleCourseStatus: (state) => {
      if (!state.detailedCourse.data) {
        console.log("no detailedCourse");
        return;
      }

      state.detailedCourse.data = {
        ...state.detailedCourse.data,
        status:
          state.detailedCourse.data.status === "Draft" ? "Published" : "Draft",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.courses.coursesLoading = true;
        state.courses.coursesError = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.courses.coursesLoading = false;
          state.courses.data = JSON.parse(JSON.stringify(action.payload));
        }
      )
      .addCase(fetchCourses.rejected, (state, action: PayloadAction<any>) => {
        state.courses.coursesLoading = false;
        state.courses.coursesError = JSON.parse(JSON.stringify(action.payload));
      })
      .addCase(fetchTop4Courses.pending, (state) => {
        state.top4Courses.top4CoursesLoading = true;
        state.top4Courses.top4CoursesError = null;
      })
      .addCase(
        fetchTop4Courses.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.top4Courses.top4CoursesLoading = false;
          state.top4Courses.data = JSON.parse(JSON.stringify(action.payload));
        }
      )
      .addCase(
        fetchTop4Courses.rejected,
        (state, action: PayloadAction<any>) => {
          state.top4Courses.top4CoursesLoading = false;
          state.top4Courses.top4CoursesError = action.payload;
        }
      )
      .addCase(fetchMyCourses.pending, (state) => {
        state.myCourses.myCourseLoading = true;
        state.myCourses.myCourseError = null;
      })
      .addCase(
        fetchMyCourses.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.myCourses.myCourseLoading = false;
          state.myCourses.data = JSON.parse(JSON.stringify(action.payload));
        }
      )
      .addCase(fetchMyCourses.rejected, (state, action: PayloadAction<any>) => {
        state.myCourses.myCourseLoading = false;
        state.myCourses.myCourseError = JSON.parse(
          JSON.stringify(action.payload)
        );
      })
      .addCase(fetchCoursesToEnroll.pending, (state) => {
        state.coursesToEnroll.coursesToEnrollLoading = true;
        state.coursesToEnroll.coursesToEnrollError = null;
      })
      .addCase(
        fetchCoursesToEnroll.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.coursesToEnroll.coursesToEnrollLoading = false;
          state.coursesToEnroll.data = JSON.parse(
            JSON.stringify(action.payload)
          );
        }
      )
      .addCase(
        fetchCoursesToEnroll.rejected,
        (state, action: PayloadAction<any>) => {
          state.coursesToEnroll.coursesToEnrollLoading = false;
          state.coursesToEnroll.coursesToEnrollError = action.payload;
        }
      )
      .addCase(fetchCoursesCreated.pending, (state) => {
        state.coursesCreated.coursesCreatedLoading = true;
        state.coursesCreated.coursesCreatedError = null;
      })
      .addCase(
        fetchCoursesCreated.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.coursesCreated.coursesCreatedLoading = false;
          state.coursesCreated.data = JSON.parse(
            JSON.stringify(action.payload)
          );
        }
      )
      .addCase(
        fetchCoursesCreated.rejected,
        (state, action: PayloadAction<any>) => {
          state.coursesCreated.coursesCreatedLoading = false;
          state.coursesCreated.coursesCreatedError = action.payload;
        }
      )
      .addCase(fetchDetailedCourse.pending, (state) => {
        state.detailedCourse.detailedCourseLoading = true;
        state.detailedCourse.detailedCourseError = null;
      })
      .addCase(
        fetchDetailedCourse.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.detailedCourse.detailedCourseLoading = false;
          state.detailedCourse.data = JSON.parse(
            JSON.stringify(action.payload)
          );
        }
      )
      .addCase(
        fetchDetailedCourse.rejected,
        (state, action: PayloadAction<any>) => {
          state.detailedCourse.detailedCourseLoading = false;
          state.detailedCourse.detailedCourseError = action.payload;
        }
      )
      .addCase(fetchDetailedCourseChapters.pending, (state) => {
        state.detailedCourseChapters.detailedCourseChaptersLoading = true;
        state.detailedCourseChapters.detailedCourseChaptersError = null;
      })
      .addCase(
        fetchDetailedCourseChapters.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.detailedCourseChapters.detailedCourseChaptersLoading = false;
          state.detailedCourseChapters.data = JSON.parse(
            JSON.stringify(action.payload)
          );
        }
      )
      .addCase(
        fetchDetailedCourseChapters.rejected,
        (state, action: PayloadAction<any>) => {
          state.detailedCourseChapters.detailedCourseChaptersLoading = false;
          state.detailedCourseChapters.detailedCourseChaptersError =
            action.payload;
        }
      )
      .addCase(fetchPublishedCourses.pending, (state) => {
        state.publishedCourses.loading = true;
        state.publishedCourses.error = null;
      })
      .addCase(
        fetchPublishedCourses.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.publishedCourses.loading = false;
          state.publishedCourses.data = JSON.parse(
            JSON.stringify(action.payload)
          );
        }
      )
      .addCase(
        fetchPublishedCourses.rejected,
        (state, action: PayloadAction<any>) => {
          state.publishedCourses.loading = false;
          state.publishedCourses.error = action.payload;
        }
      )
      .addCase(fetchDraftCourses.pending, (state) => {
        state.draftCourses.loading = true;
        state.draftCourses.error = null;
      })
      .addCase(
        fetchDraftCourses.fulfilled,
        (state, action: PayloadAction<CourseDocument[]>) => {
          state.draftCourses.loading = false;
          state.draftCourses.data = JSON.parse(JSON.stringify(action.payload));
        }
      )
      .addCase(
        fetchDraftCourses.rejected,
        (state, action: PayloadAction<any>) => {
          state.draftCourses.loading = false;
          state.draftCourses.error = action.payload;
        }
      );
  },
});

export const { toggleCourseStatus } = courseSlice.actions;

export default courseSlice.reducer;
