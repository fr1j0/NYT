import { createAction } from "@reduxjs/toolkit";
import { ArticleData } from "../types/types";

export const getArticlesAction = createAction("GET_ARTICLES", function prepare(
  articles: ArticleData[],
  page: number
) {
  return {
    payload: {
      articles,
      page,
    },
  };
});
