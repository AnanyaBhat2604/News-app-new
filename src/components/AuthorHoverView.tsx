import React from "react";

interface AuthorHoverViewProps {
  authorName: string;
  authorImage: string;
  authorDescription: string;
}

const AuthorHoverView: React.FC<AuthorHoverViewProps> = ({
  authorName,
  authorImage,
  authorDescription,
}) => {
  return (
    <div
      className="absolute z-10 p-4 bg-white border rounded shadow-lg max-w-[150px] w-max bottom-6"
      style={{ maxWidth: "250px" }}
    >
      <div className="">
        {authorImage && (
          <img
            src={authorImage}
            alt={authorName}
            className="w-10 h-10  mr-2 rounded-full"
          />
        )}
        <div>
          <h3 className="font-semibold">{authorName}</h3>
          <p className="text-sm text-gray-600">{authorDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorHoverView;
