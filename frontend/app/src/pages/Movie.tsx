import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/discover/${movieId}`)
      .then(({ data: { response } }) => {
        setMovie(response);
      });
  }, []);

  return <>{JSON.stringify(movie)}</>;
}
