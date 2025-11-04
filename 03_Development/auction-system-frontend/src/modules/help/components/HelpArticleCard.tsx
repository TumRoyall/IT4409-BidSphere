import React from "react";

const HelpArticleCard = ({ article }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-blue-700">{article.title}</h2>
      <p className="text-gray-600 mt-2 line-clamp-2">{article.summary}</p>
      <p className="mt-3 text-sm text-blue-600">Xem chi tiết →</p>
    </div>
  );
};

export default HelpArticleCard;
