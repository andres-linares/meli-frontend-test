import React, { useState } from "react";
import Image from 'next/image';
import IconSearch from '../../../public/icons/icon-search.png';
import styles from "./SearchForm.module.sass";

interface SearchFormProps {
  onSubmit: (query: string) => void
}

const SearchForm = (props: SearchFormProps) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(search);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="searchInput" className="sr-only">
        ¿Qué estás buscando?
      </label>

      <div className={styles["search-container"]}>
        <input
          type="search"
          name=""
          id="searchInput"
          placeholder="Nunca dejes de buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          <Image src={IconSearch} alt="" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
