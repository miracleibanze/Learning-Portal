import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ Ensure jest-dom is loaded
import Login from "@components/Login";

it("Should have a Login button", () => {
  render(<Login />); // ARRANGE
  const myElem = screen.getByText(/login/i); // ACT
  expect(myElem).toBeInTheDocument(); // ASSERT
});
