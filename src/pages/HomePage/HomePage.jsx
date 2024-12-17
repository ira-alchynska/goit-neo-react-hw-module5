import { useEffect, useState } from "react";
import MoviesList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies, IMAGE_BASE_URL } from "../../services/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setError("Failed to load trending movies.");
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>

      {error && <p>{error}</p>}
      {movies.length > 0 && (
        <MoviesList movies={movies} imageUrl={IMAGE_BASE_URL} />
      )}
      {movies.length === 0 && !error && <p>Loading...</p>}
    </>
  );
};

export default HomePage;
