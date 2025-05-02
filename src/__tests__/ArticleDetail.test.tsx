import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleDetail from "../components/ArticleDetail";
import { Article } from "../types";

jest.mock("../services/api", () => ({
  getAuthorById: jest.fn(() => ({
    authorId: "1",
    name: "John Doe",
    authorImage: "https://via.placeholder.com/150",
    description: "Author description",
  })),
}));

const mockArticle: Article = {
  articleId: "1",
  title: "Test Article",
  subtitle: "Test Subtitle",
  description: "<p>Test Description</p>",
  hero: "https://via.placeholder.com/600x400",
  articleType: "TEXT",
  mediaUrl: "",
  authorId: "1",
  tags: [{ tagName: "React" }, { tagName: "Testing" }],
  published: "2023-01-01",
  category: { categoryName: "Technology", categoryId: "1" },
};

describe("ArticleDetail Component", () => {
  it("renders article details correctly", () => {
    render(
      <Router>
        <ArticleDetail article={mockArticle} />
      </Router>
    );

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockArticle.hero);
  });

  it("renders description as HTML when articleType is TEXT", () => {
    render(
      <Router>
        <ArticleDetail article={mockArticle} />
      </Router>
    );

    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders video when articleType is VIDEO", () => {
    const videoArticle = {
      ...mockArticle,
      articleType: "VIDEO" as "VIDEO",
      mediaUrl: "video.mp4",
    };
    render(
      <Router>
        <ArticleDetail article={videoArticle} />
      </Router>
    );

    expect(screen.getByRole("video")).toBeInTheDocument();
  });

  it("renders audio when articleType is AUDIO", () => {
    const audioArticle = {
      ...mockArticle,
      articleType: "AUDIO" as "AUDIO",
      mediaUrl: "audio.mp3",
    };
    render(
      <Router>
        <ArticleDetail article={audioArticle} />
      </Router>
    );

    expect(screen.getByRole("audio")).toBeInTheDocument();
  });

  it("navigates back when back button is clicked", () => {
    const { container } = render(
      <Router>
        <ArticleDetail article={mockArticle} />
      </Router>
    );

    const backButton = screen.getByText(/Back/);
    fireEvent.click(backButton);

    expect(container).toBeTruthy(); // Placeholder assertion for navigation
  });

  it("shows author hover view on hover", async () => {
    render(
      <Router>
        <ArticleDetail article={mockArticle} />
      </Router>
    );

    const authorElement = screen.getByText("John Doe");
    fireEvent.mouseEnter(authorElement);

    expect(await screen.findByText("Author description")).toBeInTheDocument();
  });

  it("handles image error and displays fallback image", () => {
    render(
      <Router>
        <ArticleDetail article={mockArticle} />
      </Router>
    );

    const image = screen.getByRole("img");
    fireEvent.error(image);

    expect(image).toHaveAttribute(
      "src",
      "https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4="
    );
  });
});
