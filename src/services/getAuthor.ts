import authors from "../assets/authors.json";

type Author = {
  authorId: string;
  name: string;
  description: string;
  authorImage: string;
};

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find((author) => author.authorId === id);
};
