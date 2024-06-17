import React from 'react';
import { render, screen} from "@testing-library/react";
import Profile from './Profile';
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => ({
    authState: {}, authService: {},
  }),
}));

describe('Page: ChangePassword', () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Contact Information")).toBeDefined();
  });
});