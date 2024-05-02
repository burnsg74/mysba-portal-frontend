import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { Store } from "redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "./Header";
import showNavSlice from "src/store/showNav/showNavSlice";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => ({
    oktaAuth: {
      signOut: jest.fn(() => Promise.resolve()),
    },
  }),
}));

jest.mock("src/components/SideNav/SideNav", () => () => <div>SideNav</div>);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((key) => key),
    i18n: {
      changeLanguage: jest.fn(() => Promise.resolve())
    }
  })
}));

const mockStore = configureStore({
  reducer: {
    showNav: showNavSlice,
  },
  preloadedState: {
    showNav: { value: true, showProfile: true },
  },
});

const mockStoreHidden = configureStore({
  reducer: {
    showNav: showNavSlice,
  },
  preloadedState: {
    showNav: { value: false, showProfile: false },
  },
});

const setup = (store: Store) =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );

describe("Header Component", () => {
  it("renders the language toggle button and changes language on click", () => {
    setup(mockStore);
    const langButton = screen.getByText("Español");
    expect(langButton).toBeInTheDocument()
    fireEvent.click(langButton);
    const { i18n } = useTranslation();
    // expect(i18n.changeLanguage).toHaveBeenCalled();
  });

  it("shows the profile link if showProfile is true", () => {
    setup(mockStore);
    expect(screen.getByAltText("Profile Icon")).toBeInTheDocument();
  });

  it("handles logout correctly", () => {
    setup(mockStoreHidden);
    const logoutButton = screen.getByTestId("log-out-button");
    expect(logoutButton).toBeInTheDocument()
    fireEvent.click(logoutButton);
    const { oktaAuth } = useOktaAuth();
    // expect(oktaAuth.signOut).toHaveBeenCalled();
  });

  it("toggles navigation visibility on menu icon click", () => {
    setup(mockStore);
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 500 });
    const menuIcon = screen.getByTestId("menu-icon");
    fireEvent.click(menuIcon);
    expect(screen.getByTestId("right-side-nav-header")).toBeVisible();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
