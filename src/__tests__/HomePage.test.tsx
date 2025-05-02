import * as api from "../services/api";
import "@testing-library/jest-dom";

jest.mock("../services/api");
jest.mock(
  "../components/ArticleCard.tsx",
  () =>
    ({ article }: { article: { title: string } }) =>
      <div>{article.title}</div>
);
jest.mock(
  "../components/Filters",
  () =>
    ({
      onFilterChange,
    }: {
      onFilterChange: (filters: {
        author: string;
        category: string;
        articleType: string;
        tag: string;
      }) => void;
    }) =>
      (
        <button
          onClick={() =>
            onFilterChange({
              author: "",
              category: "",
              articleType: "",
              tag: "",
            })
          }
        >
          Apply Filters
        </button>
      )
);
jest.mock("../components/FullscreenLoader", () => () => <div>Loading...</div>);
jest.mock(
  "../components/Pagination",
  () =>
    ({
      currentPage,
      totalPages,
      onPageChange,
    }: {
      currentPage: number;
      totalPages: number;
      onPageChange: (page: number) => void;
    }) =>
      (
        <div>
          <button onClick={() => onPageChange(1)}>Page 1</button>
          <button onClick={() => onPageChange(2)}>Page 2</button>
        </div>
      )
);

describe("HomePage", () => {
  const mockArticles = [
    {
      articleId: 1,
      title: "First Article",
      authorId: "1",
      categoryId: "1",
      articleType: "TEXT",
      tags: ["tag1"],
    },
    {
      articleId: 2,
      title: "Second Article",
      authorId: "2",
      categoryId: "2",
      articleType: "VIDEO",
      tags: ["tag2"],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchAllArticles as jest.Mock).mockResolvedValue({
      data: { articles: mockArticles },
    });
    (api.fetchAllCategories as jest.Mock).mockResolvedValue({ data: [] });
    (api.fetchAllAuthors as jest.Mock).mockResolvedValue({ data: [] });
    (api.fetchAllTags as jest.Mock).mockResolvedValue({ data: [] });
  });
});
