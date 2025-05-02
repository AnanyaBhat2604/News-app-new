export interface Author {
  authorId: string;
  authorName: string;
  authorImage?: string;
  authorDescription?: string;
}

export interface Category {
  categoryId: string;
  categoryName: string;
}

export interface Tag {
  tagName: string;
}

export interface Article {
  articleId: string;
  title: string;
  subtitle: string;
  published: string;
  authorId: string;
  category: Category;
  articleType: "TEXT" | "VIDEO" | "AUDIO";
  tags: Tag[];
  hero: string;
  description?: string;
  mediaUrl?: string;
}

export interface HomePageData {
  page: number;
  categoryId: string | null;
  tag: string;
  authorName: string;
  articles: Article[];
}

export interface FilterOptions {
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  articleTypes: { id: number; name: string }[];
}

export interface ArticleHomePage {
  articleId: string;
  title: string;
  categoryId?: string;
  tags?: string[];
  authorName?: string;
}

export interface FetchAllArticlesResponse {
  status: number;
  message: string;
  data: {
    page: number;
    categoryId: string | null;
    tag: string | null;
    authorName: string;
    articles: ArticleHomePage[];
  };
}
