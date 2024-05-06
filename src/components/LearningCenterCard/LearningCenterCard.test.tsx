import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LearningCenterCard from "src/components/LearningCenterCard/LearningCenterCard";
import "@testing-library/jest-dom";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key:string) => key, // returns the key as the translated value
  }),
}));

describe("LearningCenterCard", () => {
  const learningCenterMock = {
    image: "image-url.png",
    title: "Test Course",
    id: 123,
    description: "A brief description of the course.",
    link: "https://example.com",
    library: [
      {
        id: 1,
        type: "video",
        title: "Introduction Video",
        description: "A short intro video.",
        link: "https://video.example.com",
      },
    ],
  };

  it("renders correctly with provided props", () => {
    render(<LearningCenterCard learningCenter={learningCenterMock} />);

    expect(screen.getByText("Test Course")).toBeInTheDocument();
    expect(screen.getByText("A brief description of the course.")).toBeInTheDocument();
    expect(screen.getByText("Introduction Video")).toBeInTheDocument();
    expect(screen.getByAltText("Content")).toHaveAttribute("src", "image-url.png");
  });

  it("opens correct link when view course button is clicked", () => {
    const mockOpen = jest.fn();
    global.open = mockOpen;

    render(<LearningCenterCard learningCenter={learningCenterMock} />);
    const viewCourseButton = screen.getByText("View Course");
    fireEvent.click(viewCourseButton);

    expect(mockOpen).toHaveBeenCalledWith("https://example.com", "_blank");
  });

  it("handles library item click", () => {
    const mockOpen = jest.fn();
    global.open = mockOpen;

    render(<LearningCenterCard learningCenter={learningCenterMock} />);
    const videoButton = screen.getByText("Introduction Video");
    fireEvent.click(videoButton);

    expect(mockOpen).toHaveBeenCalledWith("https://video.example.com", "_blank");
  });
});
