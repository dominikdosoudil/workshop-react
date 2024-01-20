import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { articleDetailRoute } from "../main.tsx";
import { API_HOST } from "../constants.ts";

const viewArticle = (article: { id: string; item_name: React.ReactNode }) => (
  <div className="flex flex-row gap-4">
    <Link to={articleDetailRoute.to} params={{ articleId: article.id }}>
      <div>{article.item_name}</div>
    </Link>
  </div>
);

export const Articles = () => {
  const [articles, setArticles] = useState<
    Array<{ item_name: string; id: string }>
  >([]);
  const [page, setPage] = useState(1);
  const [_requestState, setState] = useState("not sent");

  useEffect(() => {
    setState("loading");
    fetch(`${API_HOST}/articles?skip=${(page - 1) * 10}`).then((response) => {
      setState("looaded");
      response.json().then((data) => {
        setArticles(data);
      });
    });
  }, [page]);

  return (
    <div className="flex items-center flex-col">
      <div className="container mx-auto p-4 border-2 border-solid border-amber-200">
        {articles.map(viewArticle)}
      </div>
      <div className="flex flex-row gap-4">
        <button onClick={() => setPage(page - 1)}>{"<-"}</button>
        {page}
        <button onClick={() => setPage(page + 1)}>{"->"}</button>
      </div>
    </div>
  );
};
