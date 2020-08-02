import { ArticleData } from "../types/types";

type ArticlesAction = {
  type: "GET_ARTICLES";
  payload: { articles: ArticleData[]; page: number };
};

const articles = (state: ArticleData[] = [], action: ArticlesAction) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return action.payload.page === 0
        ? [...action.payload.articles]
        : [...state, ...action.payload.articles];
    default:
      return state;
  }
};

export default articles;
