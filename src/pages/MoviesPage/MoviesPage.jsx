import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import MoviesList from "../../components/MovieList/MovieList";
import { searchMovies, IMAGE_BASE_URL } from "../../services/api";

const MoviesPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasSearched, setHasSearched] = useState(false);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) {
      setSearchResult([]);
      setHasSearched(false);
      return;
    }

    async function fetchSearchResults() {
      try {
        const results = await searchMovies(query);
        setSearchResult(results);
        setHasSearched(true);
      } catch (err) {
        console.error("Error searching movies:", err);
      }
    }

    fetchSearchResults();
  }, [query]);

  function onSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    setSearchParams(value ? { query: value } : {});
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          className={css.input}
          placeholder="Search for movies..."
          defaultValue={query}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      <MoviesList movies={searchResult} imageUrl={IMAGE_BASE_URL} />

      {hasSearched && !searchResult.length && query && <p>No results found</p>}
    </div>
  );
};

export default MoviesPage;
