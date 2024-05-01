import React from "react";
import { render } from "@testing-library/react";
import AccountSetup2 from "./AccountSetup2";
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

describe("Page: AccountSetup2", () => {

  it("It renders", () => {
    const { getByText } = render(<Provider store={store}>
      <BrowserRouter>
        <AccountSetup2 />
      </BrowserRouter>
    </Provider>);

    expect(getByText("Tell us a little about your business.")).toBeDefined();
  });
});