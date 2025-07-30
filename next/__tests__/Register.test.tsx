import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ Ensure jest-dom is loaded
import Register from "@components/Register";

it("Should have a Login button", () => {
  render(<Register />); // ARRANGE
  const myElem = screen.getByText(/register/i); // ACT
  expect(myElem).toBeInTheDocument(); // ASSERT
});
