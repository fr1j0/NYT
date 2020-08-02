import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { getArticlesAction } from "../../actions/articles";
import { ArticleData, RootState, ArticleSorting } from "../../types/types";
import Article from "../Article";
import dotsLoader from "../../assets/three-dots.svg";
import "./styles.scss";

const FrontPage = () => {
  const dispatch = useDispatch();
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);
  const articles = useSelector((state: RootState) => state.articles.list);
  // const page = useSelector((state: RootState) => state.articles.page);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<ArticleSorting>("newest");

  const [debouncedCallback] = useDebouncedCallback(
    () => {
      setLoading(true);
      axios
        .get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&sort=${sorting}&page=${page}&api-key=hWKUAlYkggUKA0zKpADDw9A53LQKeArk`
        )
        .then((res) => {
          setPage((p) => p + 1);
          dispatch(getArticlesAction(res.data.response.docs, page));
        })
        .catch((_) => {})
        .finally(() => setLoading(false));
    },
    // delay in ms
    500
  );

  useEffect(() => {
    if (page === 0) debouncedCallback();
  }, [debouncedCallback, page]);

  useEffect(() => {
    setArticlesData(articles);
  }, [articles]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setPage(0);
      debouncedCallback();
    }
  }, [debouncedCallback, sorting, searchTerm.length]);

  useEffect(() => {
    setPage(0);
    debouncedCallback();
  }, [debouncedCallback, searchTerm]);

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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSorting(e.target.value as ArticleSorting);
  };

  return (
    <section className="app--articles">
      <section className="app--articles-search">
        <input placeholder="SEARCH" onInput={handleSearchChange} />
        <div className="app--articles-search-sorting">
          <label>
            <input
              type="radio"
              name="sorting-radio"
              value="newest"
              checked={sorting === "newest"}
              onChange={handleSortingChange}
            />
            newest
          </label>
          <label>
            <input
              type="radio"
              name="sorting-radio"
              value="oldest"
              checked={sorting !== "newest"}
              onChange={handleSortingChange}
            />
            oldest
          </label>
        </div>
      </section>
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
