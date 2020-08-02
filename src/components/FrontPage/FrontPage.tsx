import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import { getArticlesAction } from "../../actions/articles";
import { ArticleData, RootState, ArticleSorting } from "../../types/types";
import Article from "../Article";
import Search from "./Search";
import dotsLoader from "../../assets/three-dots.svg";
import "./styles.scss";

/**
 * Front page, shows the list of articles and search results.
 */

const FrontPage = () => {
  const dispatch = useDispatch();
  const articles: ArticleData[] = useSelector(
    (state: RootState) => state.articles
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<ArticleSorting>("newest");
  const [error, setError] = useState<string | null>(null);

  // Debounced async API call
  const [debouncedCallback] = useDebouncedCallback(() => {
    setError(null);
    setLoading(true);
    axios
      .get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&sort=${sorting}&page=${page}&api-key=hWKUAlYkggUKA0zKpADDw9A53LQKeArk`
      )
      .then((res) => {
        setPage((p) => p + 1);
        dispatch(getArticlesAction(res.data.response.docs, page));
      })
      .catch((error) => {
        setError(error.response.data.fault.faultstring);
      })
      .finally(() => setLoading(false));
  }, 2000);

  // Load 1st batch of articles
  useEffect(() => {
    if (page === 0) debouncedCallback();
  }, [debouncedCallback, page]);

  // Triggers async call when searching
  useEffect(() => {
    setPage(0);
    if (searchTerm.length > 0) {
      debouncedCallback();
    }
  }, [debouncedCallback, sorting, searchTerm.length]);

  // Triggers next page of articles loading when scrolling to the bottom of the page
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        debouncedCallback();
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleaning up the scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [debouncedCallback]);

  // Search input handler
  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Sorting input handler
  const handleSortingChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSorting(e.target.value as ArticleSorting);
    },
    []
  );

  return (
    <section className="app--articles">
      <Search
        sorting={sorting}
        handleSearchChange={handleSearchChange}
        handleSortingChange={handleSortingChange}
      />
      {articles.map((data, i) => (
        <Article key={i} data={data} />
      ))}
      {loading && (
        <section className="app--articles-loading">
          <img src={dotsLoader} alt="loading" />
        </section>
      )}
      {error && (
        <section className="app--articles-loading-error">
          <p>{error}</p>
        </section>
      )}
    </section>
  );
};

export default FrontPage;
