import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Filters from "../components/Filters";

describe("Filters Component", () => {
  const mockCategories = [
    { categoryId: "1", categoryName: "Technology" },
    { categoryId: "2", categoryName: "Health" },
  ];
  const mockAuthors = [
    {
      authorId: "1",
      name: "John Doe",
      description: "Tech writer",
      authorImage: "john.jpg",
    },
    {
      authorId: "2",
      name: "Jane Smith",
      description: "Health expert",
      authorImage: "jane.jpg",
    },
  ];
  const mockArticleTypes = ["Blog", "News", "Tutorial"];
  const mockTags = [
    { tagId: "1", name: "React" },
    { tagId: "2", name: "JavaScript" },
  ];
  const mockOnFilterChange = jest.fn();

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Filters
          categories={mockCategories}
          authors={mockAuthors}
          articleTypes={mockArticleTypes}
          tags={mockTags}
          onFilterChange={mockOnFilterChange}
        />
      </MemoryRouter>
    );

  it("renders all filter dropdowns", () => {
    renderComponent();

    expect(screen.getByLabelText(/Category:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Article Type:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tag:/)).toBeInTheDocument();
  });

  it("calls onFilterChange when a category is selected", () => {
    renderComponent();

    const categorySelect = screen.getByLabelText(/Category:/);
    fireEvent.change(categorySelect, { target: { value: "1" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: "1",
      author: null,
      articleType: null,
      tag: null,
    });
  });

  it("calls onFilterChange when an author is selected", () => {
    renderComponent();

    const authorSelect = screen.getByLabelText(/Author:/);
    fireEvent.change(authorSelect, { target: { value: "1" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: null,
      author: "1",
      articleType: null,
      tag: null,
    });
  });

  it("calls onFilterChange when an article type is selected", () => {
    renderComponent();

    const articleTypeSelect = screen.getByLabelText(/Article Type:/);
    fireEvent.change(articleTypeSelect, { target: { value: "Blog" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: null,
      author: null,
      articleType: "Blog",
      tag: null,
    });
  });

  it("calls onFilterChange when a tag is selected", () => {
    renderComponent();

    const tagSelect = screen.getByLabelText(/Tag:/);
    fireEvent.change(tagSelect, { target: { value: "React" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: null,
      author: null,
      articleType: null,
      tag: "React",
    });
  });

  it("renders correct options for each dropdown", () => {
    renderComponent();

    const categorySelect = screen.getByLabelText(/Category:/);
    const categoryOptions = within(categorySelect).getAllByRole("option");
    expect(categoryOptions).toHaveLength(3); // Includes "All" option
    expect(categoryOptions[1]).toHaveTextContent("Technology");
    expect(categoryOptions[2]).toHaveTextContent("Health");

    const authorSelect = screen.getByLabelText(/Author:/);
    const authorOptions = within(authorSelect).getAllByRole("option");
    expect(authorOptions).toHaveLength(3); // Includes "All" option
    expect(authorOptions[1]).toHaveTextContent("John Doe");
    expect(authorOptions[2]).toHaveTextContent("Jane Smith");

    const articleTypeSelect = screen.getByLabelText(/Article Type:/);
    const articleTypeOptions = within(articleTypeSelect).getAllByRole("option");
    expect(articleTypeOptions).toHaveLength(4); // Includes "All" option
    expect(articleTypeOptions[1]).toHaveTextContent("Blog");
    expect(articleTypeOptions[2]).toHaveTextContent("News");
    expect(articleTypeOptions[3]).toHaveTextContent("Tutorial");

    const tagSelect = screen.getByLabelText(/Tag:/);
    const tagOptions = within(tagSelect).getAllByRole("option");
    expect(tagOptions).toHaveLength(3); // Includes "All" option
    expect(tagOptions[1]).toHaveTextContent("React");
    expect(tagOptions[2]).toHaveTextContent("JavaScript");
  });
});

function within(element: HTMLElement) {
  return {
    getAllByRole: (role: string) => {
      return Array.from(element.querySelectorAll(`[role="${role}"]`));
    },
  };
}
// Removed duplicate function implementation
