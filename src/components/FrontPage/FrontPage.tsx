import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { getArticlesAction } from "../../actions/articles";
import { ArticleData, RootState } from "../../types/types";
import Article from "../Article";
import dotsLoader from "../../assets/three-dots.svg";
import "./styles.scss";

const FrontPage = () => {
  const dispatch = useDispatch();
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);
  const articles = useSelector((state: RootState) => state.articles.list);
  const page = useSelector((state: RootState) => state.articles.page);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setArticlesData(articles);
  }, [articles]);

  const [debouncedCallback] = useDebouncedCallback(
    () => {
      setLoading(true);
      axios
        .get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&sort=newest&page=${page}&api-key=hWKUAlYkggUKA0zKpADDw9A53LQKeArk`
        )
        .then((res) => {
          dispatch(getArticlesAction(res.data.response.docs, page));
        })
        .finally(() => setLoading(false));
    },
    // delay in ms
    500
  );

  useEffect(() => {
    debouncedCallback();
  }, [debouncedCallback]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        debouncedCallback();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [debouncedCallback]);

  return (
    <section className="app--articles">
      {articlesData.map((data, i) => (
        <Article key={i} data={data} />
      ))}
      {loading && (
        <section className="app--articles-loading">
          <img src={dotsLoader} alt="loading" />
        </section>
      )}
    </section>
  );
};

export default FrontPage;
