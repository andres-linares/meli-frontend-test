import React, { useState } from "react";
import Image from "next/image";
import IconSearch from "../../../public/icons/icon-search.png";
import styles from "./SearchForm.module.sass";

interface SearchFormProps {
  onSubmit: (query: string) => void;
  placeholder: string;
  initialValue?: string;
}

const SearchForm = ({ onSubmit, placeholder, initialValue }: SearchFormProps) => {
  const [search, setSearch] = useState(initialValue || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(search);
  };

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
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" title="Buscar">
          <span className="sr-only">Buscar</span>
          <Image src={IconSearch} alt="" />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
