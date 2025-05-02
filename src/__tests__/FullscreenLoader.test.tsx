import React from "react";
import { render, screen } from "@testing-library/react";
import FullscreenLoader from "../components/FullscreenLoader";

describe("FullscreenLoader", () => {
  it("renders without crashing", () => {
    const { container } = render(<FullscreenLoader />);
    expect(container).toBeInTheDocument();
  });

  it("displays a loader with the correct styles", () => {
    const loader = screen.getByRole("status", { hidden: true });
    expect(loader).toHaveClass(
      "w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
    );
  });

  it("is positioned correctly on the screen", () => {
    const loaderContainerParent = screen.getByTestId("loader-container");
    expect(loaderContainerParent).toHaveClass(
      "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50"
    );
  });
});
