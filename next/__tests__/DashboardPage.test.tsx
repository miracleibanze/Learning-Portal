import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { useSession } from "next-auth/react";
import React from "react";
import DashboardPage from "@app/dashboard/page";

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// Mock Redux Dispatch
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("DashboardPage", () => {
  it("renders announcements when available", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe" } },
      status: "authenticated",
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    const announcementSection = await screen.findByText("Announcement");
    expect(announcementSection).toBeInTheDocument();
  });

  it("renders the Assignment section for non-admin users", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: "student" } },
      status: "authenticated",
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    const assignmentsSection = await screen.findByText("Assignment");
    expect(assignmentsSection).toBeInTheDocument();
  });
  it("renders the Popular Course section for non-admin users", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { role: "student" } },
      status: "authenticated",
    });

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    );

    const assignmentsSection = await screen.findByText("Popular Course");
    expect(assignmentsSection).toBeInTheDocument();
  });
});
