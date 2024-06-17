import React from 'react';
import { render, screen} from "@testing-library/react";
import ErrorPage from './ErrorPage';
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Page: Error', () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Oops, looks like something went wrong")).toBeDefined();
  });
});