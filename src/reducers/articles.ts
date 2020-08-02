import { ArticleData, Articles } from "../types/types";

const defaultState: Articles = { list: [], page: 0 };

type ArticlesAction = {
  type: "GET_ARTICLES";
  payload: { articles: ArticleData[]; page: number };
};

const articles = (state: Articles = defaultState, action: ArticlesAction) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return {
        list:
          action.payload.page === 0
            ? [...action.payload.articles]
            : [...state.list, ...action.payload.articles],
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export default articles;
