import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@redux/slices/userSlice";
import refsReducer from "@redux/slices/refsSlice";
import navigationReducer from "@redux/slices/navigationSlice";
import coursesReducer from "@redux/slices/coursesSlice";
import assignmentReducer from "@redux/slices/assignmentsSlice";
import announcementsReducer from "@redux/slices/announcementsSlice";
import notificationsReducer from "@redux/slices/NotificationsSlice";
import joinRequestsReducer from "@redux/slices/requestsSlice";
import searchReducer from "@redux/slices/searchSlice";
import analyticsReducer from "@redux/slices/AnalyticsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    refs: refsReducer,
    navigation: navigationReducer,
    courses: coursesReducer,
    assignment: assignmentReducer,
    announcements: announcementsReducer,
    notifications: notificationsReducer,
    joinRequests: joinRequestsReducer,
    search: searchReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
