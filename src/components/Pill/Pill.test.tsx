import React from "react";
import { render, screen } from "@testing-library/react";
import Pill from "./Pill";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Pill Component", () => {

  test(`renders Pill component of type in-progress with correct icon`, () => {
    render(<Pill message="testMessage" type={"in-progress"} />);
    const iconUseElement = screen.getByTestId("pill-icon").querySelector("use");
    expect(iconUseElement).toHaveAttribute("xlink:href", `/assets/img/sprite.svg#schedule`);
    expect(screen.getByText("testMessage")).toBeInTheDocument();
  });

  test(`renders Pill component of type error with correct icon`, () => {
    render(<Pill message="testMessage" type={"error"} />);
    const iconUseElement = screen.getByTestId("pill-icon").querySelector("use");
    expect(iconUseElement).toHaveAttribute("xlink:href", `/assets/img/sprite.svg#cancel`);
    expect(screen.getByText("testMessage")).toBeInTheDocument();
  });
});
