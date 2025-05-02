import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Filters from "../components/Filters";
import {
  fetchAllArticles,
  fetchAllAuthors,
  fetchAllCategories,
  fetchAllTags,
} from "../services/api";
import Pagination from "../components/Pagination";
import FullscreenLoader from "../components/FullscreenLoader";

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [authorsData, setAuthorsData] = useState<any[]>([]);
  const [tagsData, setTagsData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);

  const [searchParams] = useSearchParams();

  const applyFilters = useCallback(
    (newFilters: any) => {
      const updatedArticles = articles.filter((article: any) => {
        const matchesAuthor = newFilters.author
          ? article.authorId === newFilters.author
          : true;
        const matchesCategory = newFilters.category
          ? article.categoryId === newFilters.category
          : true;
        const matchesArticleType = newFilters.articleType
          ? article.articleType === newFilters.articleType
          : true;
        const matchesTag = newFilters.tag
          ? article.tags.includes(newFilters.tag)
          : true;

        return (
          matchesAuthor && matchesCategory && matchesArticleType && matchesTag
        );
      });
      setFilteredArticles(updatedArticles);
      setCurrentPage(1); // Reset to the first page after filtering
    },
    [articles]
  );

  useEffect(() => {
    try {
      setLoading(true);
      const articlesData = fetchAllArticles(1, null, null, null);
      setArticles(articlesData?.data?.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }

    try {
      const categories = fetchAllCategories();
      setCategoriesData(categories?.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }

    try {
      const authors = fetchAllAuthors();
      setAuthorsData(authors?.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }

    try {
      const tags = fetchAllTags();
      setTagsData(tags?.data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }, []);

  useEffect(() => {
    const author = searchParams.get("author") || "";
    const category = searchParams.get("category") || "";
    const articleType = searchParams.get("articleType") || "";
    const tag = searchParams.get("tag") || "";

    const initialFilters = { author, category, articleType, tag };
    applyFilters(initialFilters);
  }, [searchParams, applyFilters]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const articleTypes = ["TEXT", "VIDEO", "AUDIO"];

  return (
    <div className="container mx-auto p-4">
      <Filters
        categories={categoriesData}
        authors={authorsData}
        articleTypes={articleTypes || []}
        tags={tagsData || []}
        onFilterChange={(newFilters: {
          author: string | null;
          category: string | null;
          articleType: string | null;
          tag: string | null;
        }) => {
          applyFilters(newFilters);

          const params = new URLSearchParams();
          if (newFilters.author) params.set("author", newFilters.author);
          if (newFilters.category) params.set("category", newFilters.category);
          if (newFilters.articleType)
            params.set("articleType", newFilters.articleType);
          if (newFilters.tag) params.set("tag", newFilters.tag);

          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${params.toString()}`
          );
        }}
      />
      {currentArticles.length > 0 ? (
        <div className="flex flex-col gap-4">
          {currentArticles.map((article) => (
            <ArticleCard key={article.articleId} article={article} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-500">
            <p>No articles found matching the current filters.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                const resetFilters: {
                  author: string;
                  category: string;
                  articleType: string;
                  tag: string;
                } = {
                  author: "",
                  category: "",
                  articleType: "",
                  tag: "",
                };

                applyFilters(resetFilters);

                window.history.replaceState(
                  null,
                  "",
                  `${window.location.pathname}`
                );
              }}
            >
              Reset Filters
            </button>
          </div>
        )
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {loading && <FullscreenLoader />}
    </div>
  );
};

export default HomePage;
