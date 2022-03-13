// import * as React from "react";
import Box from "@mui/material/Box";
import MoviePage from "./movie";
import MovieSearchField from "../components/MovieSearchField";

const IndexPage = () => {
  return (
    <main>
      <Box>
        <MovieSearchField onSelect={(v)=>{console.log(v)}}/>
      </Box>
      <h1>Movielo</h1>
      <MoviePage />
    </main>
  );
};

export default IndexPage;
