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
    <div className="w-full flex justify-center p-16">
      <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              id={movie.id}
              original_title={movie.original_title}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              overview={movie.overview}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
