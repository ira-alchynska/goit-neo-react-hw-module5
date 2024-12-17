import { useEffect, useState, useRef } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails, IMAGE_BASE_URL } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

const defaultImg = "https://via.placeholder.com/250x375?text=No+Image";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location.state);

  useEffect(() => {
    if (!movieId) return;

    async function getMovieDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
      }
    }

    getMovieDetails();
  }, [movieId]);

  function handleGoBack() {
    navigate(locationRef.current?.from || "/movies", { replace: true });
  }

  return (
    <div className={css.page}>
      <button type="button" onClick={handleGoBack} className={css.back}>
        &#8592; Go back
      </button>

      {error && <p>{error}</p>}

      {movie && (
        <div className={css.movie}>
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
            className={css.poster}
          />

          <div className={css.about}>
            <h2>{movie.title}</h2>
            <p>User score: {Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genres</h4>
            <p>{movie.genres.map((item) => item.name).join(", ")}</p>
          </div>
        </div>
      )}

      <div className={css.additional}>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
