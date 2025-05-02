import React from "react";
import { useNavigate } from "react-router-dom";

interface ArticleCardProps {
  article: {
    title: string;
    hero: string;
    articleId: string;
    subtitle: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/article/${article.articleId}`);
  };

  return (
    <div
      className="flex p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      <img
        src={article.hero}
        alt={article.title}
        className="w-1/3 max-w-[200px] rounded-lg aspect-[16/9] object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4=";
        }}
        style={{ aspectRatio: "16/9", objectFit: "cover" }} // Ensures the image maintains a 16:9 aspect ratio
      />
      <div className="ml-4 w-2/3">
        <h2 className="text-xl font-semibold">{article.title}</h2>
        <p className="text-gray-600 mt-2">{article.subtitle}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
