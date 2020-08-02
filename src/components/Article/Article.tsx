import React from "react";
import { ArticleData } from "../../types/types";
import { Link } from "react-router-dom";
import "./styles.scss";

type Props = {
  data: ArticleData;
};

const Article = ({ data }: Props) => {
  return (
    <article className="app--article-pod">
      <div className="app--article-pod-info">
        <div className="app--article-pod-headline">
          <Link to={data.uri.split("/").pop() as string}>
            <h2>{data.headline.main}</h2>
          </Link>
          <p>{data.lead_paragraph}</p>
        </div>
      </div>
    </article>
  );
};

export default Article;
