import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
      .get(
        `http://${
          import.meta.env.VITE_BACKEND_HOST
        }:8000/api/v1/discover/${movieId}`,
      )
      .then(({ data: { response } }) => {
        setMovie(response);
      });
  }, [movieId]);

  return (
    <div className="w-full flex justify-center p-16  text-white">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-x-2 font-semibold text-lg bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-xl"
      >
        {"<< Back"}
      </button>
      <div className="flex">
        <img
          className="rounded-xl object-scale-down"
          src={pictureURL}
          alt={movie.original_title}
        />
        <div className="pt-4 px-8">
          <h2 className="text-3xl font-semibold">{movie.original_title}</h2>
          <div>
            <span className="text-xs font-semibold">Release</span>
            <h3>{movie.release_date}</h3>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div>
            <span className="text-xs font-semibold">Overview</span>
            <p>{movie.overview}</p>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div>
            <span className="text-xs font-semibold">Genres</span>
            <ul className="flex space-x-2">
              {movie.genres &&
                movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="bg-blue-600 px-4 py-1 rounded-lg"
                  >
                    {genre.name}
                  </li>
                ))}
            </ul>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div>
            <span className="text-xs font-semibold">Vote averange</span>
            <div>{movie.vote_average}</div>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div>
            <span className="text-xs font-semibold">Langs</span>
            <ul className="flex space-x-2">
              {movie.spoken_languages &&
                movie.spoken_languages.map((lang) => (
                  <ul
                    key={lang.english_name}
                    className="bg-blue-600 px-4 py-1 rounded-lg"
                  >
                    {lang.english_name}
                  </ul>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
