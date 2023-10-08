import { useState } from "react";

import { MovieGrid } from "../components";

export default function Home() {
  const [page, setPage] = useState(1);

  return (
    <>
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
}
