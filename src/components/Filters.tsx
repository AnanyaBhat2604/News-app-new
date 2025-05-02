import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FiltersProps {
  categories: { categoryId: string; categoryName: string }[];
  authors: {
    authorId: string;
    name: string;
    description: string;
    authorImage: string;
  }[];
  articleTypes: string[];
  tags: { tagId: string; name: string }[];
  onFilterChange: (filters: {
    category: string | null;
    author: string | null;
    articleType: string | null;
    tag: string | null;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  authors,
  articleTypes,
  tags,
  onFilterChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(
    searchParams.get("author") || null
  );
  const [selectedArticleType, setSelectedArticleType] = useState<string | null>(
    searchParams.get("articleType") || null
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(
    searchParams.get("tag") || null
  );

  // Update query parameters and notify parent component whenever filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedAuthor) params.author = selectedAuthor;
    if (selectedArticleType) params.articleType = selectedArticleType;
    if (selectedTag) params.tag = selectedTag;

    setSearchParams(params);

    onFilterChange({
      category: selectedCategory,
      author: selectedAuthor,
      articleType: selectedArticleType,
      tag: selectedTag,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedAuthor, selectedArticleType, selectedTag]);

  return (
    <div className="flex flex-wrap justify-between p-4 bg-gray-100 rounded-lg md:flex-row flex-col gap-4 items-center">
      <div className="flex items-center">
        <label className="mr-2">Category:</label>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="border rounded p-1"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Author:</label>
        <select
          value={selectedAuthor || ""}
          onChange={(e) => setSelectedAuthor(e.target.value || null)}
          className="border rounded p-1"
        >
          <option value="">All</option>
          {authors.map((author) => (
            <option key={author.authorId} value={author.authorId}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Article Type:</label>
        <select
          value={selectedArticleType || ""}
          onChange={(e) => setSelectedArticleType(e.target.value || null)}
          className="border rounded p-1"
        >
          <option value="">All</option>
          {articleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label className="mr-2">Tag:</label>
        <select
          value={selectedTag || ""}
          onChange={(e) => setSelectedTag(e.target.value || null)}
          className="border rounded p-1"
        >
          <option value="">All</option>
          {tags.map((tag) => (
            <option key={tag.tagId} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
