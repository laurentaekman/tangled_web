import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/components/SearchBar.module.css";
import { CrossCircle } from "../assets/CrossCircleIcon";
import { SearchIcon } from "../assets/SearchIcon";

interface Props {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export const SearchBar = ({ setSearchTerm, isLoading }: Props) => {
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
        <div className={styles.search_actions}>
          {searchValue && (
            <button
              onClick={clearInput}
              aria-label="clear search"
              type="button"
            >
              <CrossCircle />
            </button>
          )}
          {!isLoading && (
            <button type="submit" aria-label="search">
              <SearchIcon />
            </button>
          )}
          {isLoading && <div className={styles.search_loader}></div>}
        </div>
      </div>
    </form>
  );
};
