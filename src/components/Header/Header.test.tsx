import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "./Header"; // Adjust the import path as necessary
import showNavSlice, { setNav } from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => ({
    oktaAuth: {
      signOut: jest.fn(),
    },
  }),
}));

jest.mock("src/components/SideNav/SideNav", () => () => <div>SideNav</div>);

const mockStore = configureStore({
  reducer: {
    showNav: showNavSlice,
  },
  preloadedState: {
    showNav: { value: true, showProfile: true },
  },
});

const setup = (store = mockStore) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

describe("Header Component", () => {
  it("renders the language toggle button and changes language on click", () => {
    setup();
    const langButton = screen.getByText("Español");
    fireEvent.click(langButton);
    expect(langButton).toHaveTextContent("English"); // Assuming state update and re-rendering
  });

  it("shows the profile link if showProfile is true", () => {
    setup();
    expect(screen.getByText("Profile Icon")).toBeInTheDocument();
  });

  it("handles logout correctly", () => {
    setup();
    const logoutButton = screen.getByText("Log Out");
    fireEvent.click(logoutButton);
    expect(useOktaAuth().oktaAuth.signOut).toHaveBeenCalled();
  });

  it("toggles navigation visibility on menu icon click", () => {
    setup();
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 500})
    const menuIcon = screen.getByTestId("menu-icon");
    fireEvent.click(menuIcon);
    expect(screen.getByTestId("right-size-nav-header")).toBeNull();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
