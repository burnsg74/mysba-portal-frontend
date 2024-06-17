import React from 'react';
import { render, screen} from "@testing-library/react";
import LinkLaunchPad from './LinkLaunchPad';
import { Provider } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Page: LinkLaunchPad', () => {

  it("It renders", () => {
    render(<Provider store={store}>
      <BrowserRouter>
        <LinkLaunchPad />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("You are connecting an existing account to your new MySBA account. Log in below to finish connecting this account.")).toBeDefined();
  });
});