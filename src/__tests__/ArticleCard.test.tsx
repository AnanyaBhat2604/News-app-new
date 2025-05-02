import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ArticleCard from "../components/ArticleCard"; // Adjust the path based on the actual location of the ArticleCard component
import { BrowserRouter } from "react-router-dom";

test("renders ArticleCard component", () => {
  render(
    <ArticleCard
      article={{
        title: "Sample Article",
        hero: "sample-hero.jpg",
        articleId: "123",
        subtitle: "This is a sample subtitle",
      }}
    />
  );
  const linkElement = screen.getByText(/article title/i);
  expect(linkElement).toBeInTheDocument();
});
describe("ArticleCard Component", () => {
  const mockArticle = {
    title: "Sample Article",
    hero: "sample-hero.jpg",
    articleId: "123",
    subtitle: "This is a sample subtitle",
  };

  it("renders the article title and subtitle", () => {
    render(
      <BrowserRouter>
        <ArticleCard article={mockArticle} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.subtitle)).toBeInTheDocument();
  });

  it("renders the hero image with correct src and alt attributes", () => {
    render(
      <BrowserRouter>
        <ArticleCard article={mockArticle} />
      </BrowserRouter>
    );

    const image = screen.getByAltText(mockArticle.title) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockArticle.hero);
  });

  it("falls back to a default image if the hero image fails to load", () => {
    render(
      <BrowserRouter>
        <ArticleCard article={mockArticle} />
      </BrowserRouter>
    );

    const image = screen.getByAltText(mockArticle.title) as HTMLImageElement;
    fireEvent.error(image);
    expect(image.src).toContain(
      "https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg"
    );
  });

  it("navigates to the correct article page on click", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <ArticleCard article={mockArticle} />
      </BrowserRouter>
    );

    const card = screen.getByRole("article", { name: mockArticle.title });
    fireEvent.click(card!);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/article/${mockArticle.articleId}`
    );
  });
});
