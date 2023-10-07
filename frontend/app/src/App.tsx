import axios from "axios";
import { useState, useEffect } from "react";

import { MovieCard } from "./components";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/discover?page=${page}`)
      .then(({ data: { response } }) => {
        setMovies(response.results);
      });
  }, [page]);

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            original_title={movie.original_title}
            release_date={movie.release_date}
            poster_path={movie.poster_path}
            overview={movie.overview}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setPage((curretPage) => curretPage - 1)}
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => setPage((curretPage) => curretPage + 1)}
      >
        Next
      </button>
    </>
  );
};
