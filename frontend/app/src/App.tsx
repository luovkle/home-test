import { useState } from "react";

import { MovieGrid, SearchBar } from "./components";

export const App = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <SearchBar />
      <MovieGrid page={page} />
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
