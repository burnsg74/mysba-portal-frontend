import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "src/store/store";
import Loading from "src/pages/Loading/Loading";

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

describe("Page: Loading", () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <Loading />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Authenticating")).toBeDefined();
  });
});