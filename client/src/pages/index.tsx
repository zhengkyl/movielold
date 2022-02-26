// import * as React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MoviePage from "./movie";

const IndexPage = () => {
  const { searchText, setSearchText, search } = useSearchMovies();
  return (
    <main>
      <Box>
        <Autocomplete
          freeSolo
          autoHighlight
          options={search.result?.results || []}
          loading={search.loading}
          inputValue={searchText}
          onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
          renderInput={(params) => (
            <TextField {...params} label="Search for movies..." />
          )}
        ></Autocomplete>
      </Box>
      <h1>Movielo</h1>
      <MoviePage/>
    </main>
  );
};

export default IndexPage;
