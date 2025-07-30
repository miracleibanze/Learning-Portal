import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "@components/Sidebar";
import { User } from "next-auth";

describe("Sidebar Component", () => {
  const mockUser: User = {
    id: "sdf34s4rfces",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    premium: true,
    lastActive: Date.now(),
    picture: "https://via.placeholder.com/80",
  };

  it("renders the user name and email correctly", () => {
    render(<Sidebar user={mockUser} />);

    // Check if the user's name is rendered
    const userNameElement = screen.getByText(/John Doe/i);
    expect(userNameElement).toBeInTheDocument();

    // Check if the user's email is rendered
    const userEmailElement = screen.getByText(/john.doe@example.com/i);
    expect(userEmailElement).toBeInTheDocument();
  });

  it("does not render the sidebar if user is not provided", () => {
    // @ts-ignore - Intentionally passing undefined to test the component
    render(<Sidebar user={undefined} />);

    // Check if the sidebar content is not rendered
    const userNameElement = screen.queryByText(/John Doe/i);
    expect(userNameElement).not.toBeInTheDocument();

    const userEmailElement = screen.queryByText(/john.doe@example.com/i);
    expect(userEmailElement).not.toBeInTheDocument();
  });
});
