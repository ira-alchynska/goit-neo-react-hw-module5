import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    async function getCast() {
      try {
        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        console.error("Error fetching movie credits:", err);
      }
    }

    getCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          {actor.name} - {actor.character}
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
