import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import challengeReducer from "@/redux/slices/challengeSlice";
import communityReducer from "@/redux/slices/communitySlice";
import analyticReducer from "@/redux/slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenge: challengeReducer,
    community: communityReducer,
    analytic: analyticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
