import React from "react";
import { render, screen } from "@testing-library/react";
import ApplyCert1 from "./ApplyCert1";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Page: ApplyCert1", () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <ApplyCert1 />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("What kind of certification would you like to apply for?")).toBeDefined();
  });
});