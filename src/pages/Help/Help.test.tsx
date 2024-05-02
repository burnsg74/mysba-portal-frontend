import React from 'react';
import { render, screen} from "@testing-library/react";
import Help from './Help';
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Page: Help', () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <Help />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Frequently Asked Questions")).toBeDefined();
  });
});