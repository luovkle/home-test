import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Genre {
  id: number;
  name: string;
}

interface SpokenLanguages {
  english_name: string;
}

interface MovieType {
  original_title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  genres: Genre[];
  spoken_languages: SpokenLanguages[];
  vote_average: number;
}

export default function Movie() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<MovieType>({
    original_title: "",
    poster_path: "",
    release_date: "",
    overview: "",
    genres: [],
    spoken_languages: [],
    vote_average: 0,
  });

  const pictureURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/discover/${movieId}`)
      .then(({ data: { response } }) => {
        setMovie(response);
      });
  }, []);

  return (
    <>
      <img
        className="rounded-t-lg"
        src={pictureURL}
        alt={movie.original_title}
      />
      <h2>{movie.original_title}</h2>
      <h3>{movie.release_date}</h3>
      <hr />
      <p>{movie.overview}</p>
      <hr />
      <ul>
        {movie.genres &&
          movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
      </ul>
      <span>{movie.vote_average}</span>
      <hr />
      <ul>
        {movie.spoken_languages &&
          movie.spoken_languages.map((lang) => (
            <ul key={lang.english_name}>{lang.english_name}</ul>
          ))}
      </ul>
    </>
  );
}
