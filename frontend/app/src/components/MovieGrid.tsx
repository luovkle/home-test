import axios from "axios";
import { useState, useEffect } from "react";

import { MovieCard } from "./";

export default function MovieGrid({ page }: { page: number }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/discover?page=${page}`)
      .then(({ data: { response } }) => {
        setMovies(response.results);
      });
  }, [page]);

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard
            original_title={movie.original_title}
            release_date={movie.release_date}
            poster_path={movie.poster_path}
            overview={movie.overview}
          />
        </li>
      ))}
    </ul>
  );
}
