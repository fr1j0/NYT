import React from "react";
import { ArticleData } from "../../types/types";
import { Link } from "react-router-dom";
import "./styles.scss";
import { cleanSectionName } from "../../utils/string";

type Props = {
  data: ArticleData;
};

/**
 * Article pod for the front page
 *
 * @param data ArticleData
 */

const Article = ({ data }: Props) => {
  return (
    <article className="app--article-pod">
      <div className="app--article-pod-info">
        <div className="app--article-pod-headline">
          <Link to={data.uri.split("/").pop() as string}>
            <h2>{data.headline.main}</h2>
          </Link>
          <p>{data.lead_paragraph}</p>
          <div className="app--article-pod-footer">
            <span className="app--article-pod-footer-block">
              <span
                className={`app--article-pod-section app--article-pod-section__${cleanSectionName(
                  data.section_name
                )}`}
              >
                {data.section_name}
              </span>
              <span className="app--article-pod-subsection">
                {data.subsection_name}
              </span>
            </span>
            <span className="app--article-pod-footer-block">
              <span className="app--article-pod-organization">
                {data.byline.organization}
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
