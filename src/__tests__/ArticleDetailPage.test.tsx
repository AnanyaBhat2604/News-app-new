import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ArticleDetailPage from "../pages/ArticleDetailPage";
import { BrowserRouter } from "react-router-dom";
import * as api from "../services/api";
import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

jest.mock("../services/api");
jest.mock("../components/FullscreenLoader", () =>
  jest.fn(() => <div>Loading...</div>)
);
jest.mock("../components/ArticleDetail", () =>
  jest.fn(({ article }) => <div>{article.title}</div>)
);

describe("ArticleDetailPage (Success Cases)", () => {
  const mockFetchArticleById = api.fetchArticleById as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays article content after successful fetch", async () => {
    mockFetchArticleById.mockResolvedValue({
      data: { id: 1, title: "Test Article" },
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("does not show loader after article is loaded", async () => {
    mockFetchArticleById.mockResolvedValue({
      data: { id: 2, title: "Another Article" },
    });

    render(
      <MemoryRouter initialEntries={["/article/2"]}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("uses the correct route param to fetch article", async () => {
    const mockArticle = { id: 123, title: "Route Param Article" };
    mockFetchArticleById.mockResolvedValue({ data: mockArticle });

    render(
      <MemoryRouter initialEntries={["/article/123"]}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockFetchArticleById).toHaveBeenCalledWith("123");
    });
  });
});
