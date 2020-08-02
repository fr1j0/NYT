import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, ArticleData } from "../../types/types";
import { getImage } from "../../utils/images";
import "./styles.scss";

type MatchParams = {
  id: string;
};

const ArticleDetail = () => {
  const match = useRouteMatch<MatchParams>();
  const articleData: ArticleData | undefined = useSelector((state: RootState) =>
    state.articles.list.find((article) =>
      article.uri.includes(match?.params.id)
    )
  );

  return (
    <section className="app--article-detail">
      <h2>{articleData?.headline.main}</h2>
      <p>{articleData?.abstract}</p>
      {articleData?.multimedia && articleData?.multimedia.length > 0 && (
        <img src={getImage(articleData?.multimedia, "xlarge")} alt=""></img>
      )}
    </section>
  );
};

export default ArticleDetail;
