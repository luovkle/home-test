import { useState } from "react";

import { MovieGrid } from "../components";

export default function Home() {
  const [page, setPage] = useState(1);

  return (
    <>
      <MovieGrid page={page} />
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-x-2 text-white flex">
        <button
          type="button"
          onClick={() =>
            setPage((curretPage) =>
              curretPage > 1 ? curretPage - 1 : curretPage,
            )
          }
          className={
            "font-semibold text-xl py-2 px-4 rounded-xl" +
            (page > 1 ? " bg-blue-600 hover:bg-blue-500" : " bg-blue-700")
          }
        >
          {"<< Back"}
        </button>
        <button
          type="button"
          onClick={() => setPage((curretPage) => curretPage + 1)}
          className="font-semibold text-xl bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-xl"
        >
          {"Next >>"}
        </button>
      </div>
    </>
  );
}
