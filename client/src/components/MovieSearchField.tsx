// import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import { jsx } from "@emotion/react";
import { useAutocompleteMovies } from "../hooks/useAutocompleteMovies";
import { MovieResult } from "../services/MovieService";

export interface MovieSelection {
  title: string;
  id?: number;
}
interface MovieSearchFieldProps {
  onSelect: (selection: MovieSelection) => void;
}

const MovieSearchField = (props: MovieSearchFieldProps) => {
  const { searchText, setSearchText, search } = useAutocompleteMovies();
  const { onSelect, ...otherProps } = props;

  return (
    <Autocomplete
      {...otherProps}
      freeSolo
      options={search.result || []}
      // disable filter b/c already filtered
      filterOptions={(x) => x}
      // autocompleted MovieResult vs non autocompleted string
      getOptionLabel={(movie: MovieResult | string) => movie.title ?? movie}
      renderOption={(props, movie) => (
        <li {...props} key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            loading="lazy"
            width={24}
          />
          <span css={{ margin: 8, width: "100%" }}>{movie.title}</span>
          <span css={{ color: grey[500] }}>{movie.year}</span>
        </li>
      )}
      // inputValue is text, value is option's value
      inputValue={searchText}
      onInputChange={(_, newInputValue) => {
        setSearchText(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for movies..." />
      )}
      // onChange only fires when an option is selected or empty string
      // ignore empty strings, convert value to string
      onChange={(_, value) =>
        value && onSelect({ title: value.title ?? value, id: value.id })
      }
    />
  );
};

export default MovieSearchField;
