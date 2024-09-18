import React from "react";
import { render, screen } from "@testing-library/react";
import AccountSetup3 from "./AccountSetup3";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Page: AccountSetup3", () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <AccountSetup3 />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Your account is all set up.")).toBeDefined();
  });
});