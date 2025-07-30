import { CourseDocument } from "@lib/models/Course";
import { createSlice } from "@reduxjs/toolkit";

const getInitialNavigationState = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768 ? false : true;
  }
  return false;
};

export interface navbarBackType {
  state: boolean;
  title: string;
  url: string;
  list: { url: string; name: string }[];
}

const initialState = {
  isOpenNavigation: getInitialNavigationState(),
  navbarBack: {
    state: false,
    title: "",
    url: "",
    list: [],
  },
  notification: {
    type: "",
    content: "",
    state: false,
  },
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleNavigation: (state) => {
      state.isOpenNavigation = !state.isOpenNavigation;
    },
    setNavigationState: (state, action) => {
      state.isOpenNavigation = action.payload;
    },
    setNavigationBackState: (state, action) => {
      state.navbarBack = action.payload;
    },
  },
});

export const { toggleNavigation, setNavigationState, setNavigationBackState } =
  navigationSlice.actions;
export default navigationSlice.reducer;
