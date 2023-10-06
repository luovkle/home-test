import axios from "axios";
import { useState, useEffect } from "react";

export const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/discover?page=4")
      .then(({ data: { response } }) => {
        setMovies(response.results);
      });
  }, []);

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id}>{JSON.stringify(movie)}</div>
      ))}
    </>
  );
};
