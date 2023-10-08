import { Route, Routes } from "react-router-dom";

import { SearchBar } from "./components";
import { Home } from "./pages";

export const App = () => {
  return (
    <>
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};
