export const parseHomePageData = (data: any) => {
  if (data.status !== 1) {
    throw new Error(data.message);
  }

  return {
    page: data.data.page,
    articles: data.data.articles.map((article: any) => ({
      articleId: article.articleId,
      title: article.title,
      hero: article.hero,
      categoryId: article.categoryId,
      authorId: article.authorId,
      articleType: article.articleType,
      tags: article.tags,
    })),
  };
};

export const parseArticleData = (data: any) => {
  if (data.status !== 1) {
    throw new Error(data.message);
  }

  const { articleId, title, hero, author, subtitle, description, articleType } =
    data.data;

  return {
    articleId,
    title,
    hero,
    author: {
      authorId: author.authorId,
      authorName: author.authorName,
      authorImage: author.authorImage,
    },
    subtitle,
    description,
    articleType,
  };
};

export const parseCategoriesData = (data: any) => {
  if (data.status !== 1) {
    throw new Error(data.message);
  }

  return data.data.categories.map((category: any) => ({
    categoryId: category.categoryId,
    categoryName: category.categoryName,
  }));
};
