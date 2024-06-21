import React, {useState} from "react";
import styles from "./searchbar.module.css";
import SearchIcon from "@/app/assets/SearchIcon.svg";

const SearchBar: React.FC = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      onSearch(newQuery);
    };

    return (
        <div className={styles.searchbar}>
        <label htmlFor="search" className={styles.searchLabel}>
            <SearchIcon className={styles.searchIcon} />
        </label>
        <input
            type="text"
            id="search"
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
            placeholder="Search for users..."
        />
        </div>
    )
}

export default SearchBar;