import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { CrossCircle } from "../assets/CrossCircleIcon";
import { SearchIcon } from "../assets/SearchIcon";

interface Props {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ setSearchTerm }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const clearInput = () => {
    setSearchValue("");
    setSearchTerm("");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSearchTerm(searchValue);
      }}
      className={styles.container}
    >
      <div className={styles.search_elements}>
        <input
          type="text"
          placeholder="Search for items..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className={styles.search}
        ></input>
        {searchValue && (
          <span role="button" onClick={clearInput}>
            <CrossCircle />
          </span>
        )}
        <button type="submit">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};
