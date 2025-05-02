import articlesData from "../assets/articles.json"; // Import the JSON file
import { ArticleHomePage, FetchAllArticlesResponse } from "../types";

export const fetchArticleById = (articleId: string) => {
  try {
    const article = articlesData.find(
      (article) => article.articleId === articleId
    );

    if (!article) {
      throw new Error(`Article with ID ${articleId} not found`);
    }

    return {
      status: 1,
      message: "success",
      data: article,
    };
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error;
  }
};

export const fetchAllArticles = (
  page: number,
  categoryId: string | null,
  tag: string | null,
  authorName: string | null
): FetchAllArticlesResponse => {
  try {
    if (!articlesData || articlesData.length === 0) {
      throw new Error("No articles found in the JSON file.");
    }

    return {
      status: 1,
      message: "success",
      data: {
        page: page || 1,
        categoryId: categoryId || null,
        tag: tag || null,
        authorName: authorName || "Anonymous",
        articles: articlesData.map((article) => ({
          title: article?.title,
          hero: article?.hero,
          articleId: article?.articleId,
          categoryId: article?.categoryId,
          subtitle: article?.subtitle,
          authorId: article?.authorId,
          articleType: article?.articleType,
          tags: article?.tags,
        })) as ArticleHomePage[],
      },
    };
  } catch (error) {
    console.error("Error fetching all articles:", error);
    return {
      status: 0,
      message: "Failed to fetch articles",
      data: {
        page: page || 1,
        categoryId: categoryId || null,
        tag: tag || null,
        authorName: authorName || "Anonymous",
        articles: [],
      },
    };
  }
};
