import React, { useEffect, useState } from "react";
import { Article, Author } from "../types";
import AuthorHoverView from "./AuthorHoverView";
import { getAuthorById } from "../services/api";
import { useNavigate } from "react-router-dom";

interface ArticleDetailProps {
  article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const [author, setAuthor] = useState<Author | undefined>(undefined);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const navigateBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  const renderDescription = () => {
    if (article.articleType === "TEXT" && article?.description) {
      return <div dangerouslySetInnerHTML={{ __html: article.description }} />;
    } else if (article.articleType === "VIDEO") {
      return (
        <video controls>
          <source src={article.mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else if (article.articleType === "AUDIO") {
      return (
        <audio controls>
          <source src={article.mediaUrl} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorData = getAuthorById(article?.authorId);
      if (authorData && authorData.name) {
        setAuthor({
          authorId: authorData.authorId,
          authorName: authorData.name,
          authorImage: authorData.authorImage,
          authorDescription: authorData.description,
        });
      }
    };
    fetchAuthor();
  }, [article]);

  return (
    <div className="p-4">
      <button
        onClick={navigateBack}
        className="mt-3 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {window.history.state && window.history.state.idx > 0
          ? "Back"
          : "Back to All Articles"}
      </button>
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <img
        src={article.hero}
        alt={article.title}
        className="my-4 aspect-[16/9] w-full object-cover"
        style={{
          aspectRatio: "16/9",
          objectFit: "cover",
          height: "fit-content",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4=";
        }}
      />
      <div className="flex items-center">
        <span
          className="mr-2 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Author:{" "}
          <span className="cursor-pointer underline">{author?.authorName}</span>
          {isHovered && (
            <div className="absolute top-full left-0 z-10 min-w-[288px] max-w-[288px] bg-white shadow-lg border border-gray-200">
              <AuthorHoverView
                authorName={author?.authorName || ""}
                authorImage={
                  author?.authorImage || "https://via.placeholder.com/150"
                }
                authorDescription={author?.authorDescription || ""}
              />
            </div>
          )}
        </span>
      </div>
      <h2 className="text-xl italic">{article.subtitle}</h2>
      <div className="mt-4">{renderDescription()}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-500 rounded-full text-sm cursor-pointer hover:bg-blue-200"
            onClick={() => navigate(`/?tag=${tag}`)}
          >
            {String(tag)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
