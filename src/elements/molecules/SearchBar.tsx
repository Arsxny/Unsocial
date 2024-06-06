import React from "react";
import styles from "../molecules/elements.module.css";
import SearchIcon from "@/assets/SearchIcon.svg";

const SearchBar: React.FC = () => {
    return (
        <div className={styles.searchbar}>
        <label htmlFor="search" className={styles.searchLabel}>
            <SearchIcon className={styles.searchIcon} />
        </label>
        <input
            type="text"
            id="search"
            className={styles.searchInput}
            placeholder="Search..."
        />
        </div>
    )
}

export default SearchBar;