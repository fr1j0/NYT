import React, { ChangeEvent } from "react";
import { ArticleSorting } from "../../types/types";

type Props = {
  sorting: ArticleSorting;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortingChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Search component
 * @param {Function} handleSearchChange Search input handler
 * @param {Function} handleSortingChange Sorting input handler
 * @param {ArticleSorting} sorting Sorting type
 */
const Search = ({
  handleSearchChange,
  handleSortingChange,
  sorting,
}: Props) => {
  return (
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
  );
};

export default Search;
