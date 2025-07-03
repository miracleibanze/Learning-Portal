import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state shape with string identifiers (could be section names or IDs)
interface RefsState {
  about: string;
  features: string;
  courses: string;
  pricing: string;
}

const initialState: RefsState = {
  about: "",
  features: "",
  courses: "",
  pricing: "",
};

const refsSlice = createSlice({
  name: "refs",
  initialState,
  reducers: {
    setAboutRef(state, action: PayloadAction<string>) {
      state.about = action.payload;
    },
    setFeaturesRef(state, action: PayloadAction<string>) {
      state.features = action.payload;
    },
    setCoursesRef(state, action: PayloadAction<string>) {
      state.courses = action.payload;
    },
    setPricingRef(state, action: PayloadAction<string>) {
      state.pricing = action.payload;
    },
    scrollToSection(state, action: PayloadAction<keyof RefsState>) {
      const sectionId = state[action.payload];

      if (sectionId) {
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) {
          console.warn(`Section with ID ${sectionId} not found.`);
        } else {
          sectionElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Fallback to window.scrollTo if needed
          if (!sectionElement.getBoundingClientRect().top) {
            window.scrollTo({
              top: sectionElement.offsetTop,
              behavior: "smooth",
            });
          }
        }
      }
    },
  },
});

export const {
  setAboutRef,
  setFeaturesRef,
  setCoursesRef,
  setPricingRef,
  scrollToSection,
} = refsSlice.actions;

export default refsSlice.reducer;
