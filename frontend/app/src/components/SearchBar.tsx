import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";

interface Result {
  id: number;
  original_title: string;
}

const ws_url = `ws://${
  import.meta.env.VITE_BACKEND_HOST
}:8000/api/v1/search/ws`;

export default function SearchBar() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const navigate = useNavigate();

  const { sendMessage, lastMessage } = useWebSocket(ws_url);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
    sendMessage(title);
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      setResults(data.results);
    }
  };

  const handleClick = (movieId: number) => {
    setTitle("");
    setResults([]);
    navigate(`/${movieId}`);
  };

  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies"
          required
          value={title}
          onChange={handleChange}
        />
      </div>
      {results.length > 0 && (
        <ul className="bg-gray-800 text-white px-4 pb-4 pt-2 rounded-b-xl">
          {results.map((result) => (
            <li
              key={result.id}
              className="hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer"
              onClick={() => handleClick(result.id)}
            >
              {result.original_title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
