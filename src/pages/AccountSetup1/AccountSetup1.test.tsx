import React from "react";
import { render } from "@testing-library/react";
import AccountSetup1 from "./AccountSetup1";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("src/utils/constants", () => ({
  BASE_API_URL: "http://localhost/",
}));

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => ({
    authState: {}, authService: {},
  }),
}));

describe("Page: AccountSetup1", () => {

  it("It renders", () => {
    const { getByText } = render(<Provider store={store}>
      <BrowserRouter>
        <AccountSetup1 />
      </BrowserRouter>
    </Provider>);

    expect(getByText("Here's what we found about you")).toBeDefined();
  });
});