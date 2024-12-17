import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

const DEFAULT_IMAGE = "https://via.placeholder.com/200x300?text=No+Image";

const MovieList = ({ movies, imageUrl }) => (
  <ul className={styles.list}>
    {movies.map((movie) => (
      <li key={movie.id} className={styles.item}>
        <Link className={styles.movieLink} to={`/movies/${movie.id}`}>
          <img
            className={styles.image}
            src={
              movie.poster_path
                ? `${imageUrl}${movie.poster_path}`
                : DEFAULT_IMAGE
            }
            alt={movie.title || "No Title"}
          />
          <p className={styles.title}>{movie.title || "Untitled"}</p>
        </Link>
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string, 
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default MovieList;
