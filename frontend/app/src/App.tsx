import { Route, Routes } from "react-router-dom";

import { SearchBar } from "./components";
import { Home, Movie } from "./pages";

export const App = () => {
  return (
    <>
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":movieId" element={<Movie />} />
      </Routes>
    </>
  );
};
