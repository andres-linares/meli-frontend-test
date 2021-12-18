const SearchForm = () => {
  return (
    <form action="">
      <label htmlFor="searchInput" className="sr-only">
        ¿Qué estás buscando?
      </label>

      <div>
        <input type="search" name="" id="searchInput" placeholder="Nunca dejes de buscar" />

        <button type="submit">🔍</button>
      </div>
    </form>
  );
};

export default SearchForm;
