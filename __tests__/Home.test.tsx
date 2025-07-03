import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensures Jest DOM matchers are loaded
import Home from "@app/page";
import {
  setAboutRef,
  setCoursesRef,
  setFeaturesRef,
  setPricingRef,
} from "@redux/slices/refsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Dummy store setup for testing
const testStore = configureStore({
  reducer: {
    refs: createSlice({
      name: "refs",
      initialState: {
        about: "",
        features: "",
        courses: "",
        pricing: "",
      },
      reducers: {
        setAboutRef(state, action: PayloadAction<string>) {
          state.about = action.payload;
        },
        setPricingRef(state, action: PayloadAction<string>) {
          state.pricing = action.payload;
        },
        setFeaturesRef(state, action: PayloadAction<string>) {
          state.features = action.payload;
        },
        setCoursesRef(state, action: PayloadAction<string>) {
          state.courses = action.payload;
        },
      },
    }).reducer,
  },
});

describe("Home page test", () => {
  it("Should have a started text", () => {
    render(
      <Provider store={testStore}>
        <Home />
      </Provider>
    ); // ARRANGE
    const myElem = screen.getByText(/started/i); // ACT
    expect(myElem).toBeInTheDocument(); // ASSERT
  });

  it("should handle refs", () => {
    const action = setAboutRef("about");
    testStore.dispatch(action); // Dispatch action
    const state = testStore.getState().refs;
    expect(state.about).toBe("about");
  });
  it("should handle courses refs", () => {
    const action = setCoursesRef("courses");
    testStore.dispatch(action); // Dispatch action
    const state = testStore.getState().refs;
    expect(state.courses).toBe("courses");
  });
  it("should handle pricing refs", () => {
    const action = setPricingRef("pricing");
    testStore.dispatch(action); // Dispatch action
    const state = testStore.getState().refs;
    expect(state.pricing).toBe("pricing");
  });
  it("should handle features refs", () => {
    const action = setFeaturesRef("features");
    testStore.dispatch(action); // Dispatch action
    const state = testStore.getState().refs;
    expect(state.features).toBe("features");
  });
});
