import { Link } from "react-router-dom";

interface Props {
  id: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

export default function MovieCard({
  id,
  original_title,
  release_date,
  poster_path,
  overview,
}: Props) {
  const pictureURL = "https://image.tmdb.org/t/p/w500" + poster_path;

  return (
    <div className="h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/${id}`}>
        <img className="rounded-t-lg" src={pictureURL} alt={original_title} />
      </Link>
      <div className="p-5">
        <Link to={`/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {original_title} <span>{release_date}</span>
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {overview}
        </p>
        <Link
          to={`/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
