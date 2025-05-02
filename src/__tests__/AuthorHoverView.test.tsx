import React from "react";
import { render, screen } from "@testing-library/react";
import AuthorHoverView from "../components/AuthorHoverView";

describe("AuthorHoverView Component", () => {
  const mockProps = {
    authorName: "John Doe",
    authorImage: "https://via.placeholder.com/150",
    authorDescription: "A passionate writer and storyteller.",
  };

  it("renders the author's name", () => {
    render(<AuthorHoverView {...mockProps} />);
    expect(screen.getByText(mockProps.authorName)).toBeInTheDocument();
  });

  it("renders the author's description", () => {
    render(<AuthorHoverView {...mockProps} />);
    expect(screen.getByText(mockProps.authorDescription)).toBeInTheDocument();
  });

  it("renders the author's image when provided", () => {
    render(<AuthorHoverView {...mockProps} />);
    const image = screen.getByAltText(mockProps.authorName);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.authorImage);
  });

  it("does not render an image if authorImage is not provided", () => {
    render(<AuthorHoverView {...mockProps} />);
    expect(screen.queryByAltText(mockProps.authorName)).not.toBeInTheDocument();
  });
});
