import React from 'react';
import { render, screen} from "@testing-library/react";
import Loans from './Loans';
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Page: Loans', () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <Loans />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Under Construction")).toBeDefined();
  });
});