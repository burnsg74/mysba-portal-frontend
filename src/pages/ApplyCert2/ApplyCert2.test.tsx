import React from "react";
import { render, screen} from "@testing-library/react";
import ApplyCert2 from "./ApplyCert2";
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Page: ApplyCert2", () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <ApplyCert2 />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("You're being directed to the Women Owned Small Business (WOSB) Certification portal.")).toBeDefined();
  });
});