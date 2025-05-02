import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleDetail from "../components/ArticleDetail";
import { fetchArticleById } from "../services/api";

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      try {
        const data = fetchArticleById(id);
        setArticle(data?.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    } else {
      console.error("Article ID is not provided");
    }
  }, [id]);

  return (
    <div className="my-6 p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      {error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-red-600 text-center font-semibold text-lg mb-4">
            Error: {error}
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go to All Articles
          </button>
        </div>
      ) : (
        article && (
          <div>
            <ArticleDetail article={article} />
          </div>
        )
      )}
    </div>
  );
};

export default ArticleDetailPage;
