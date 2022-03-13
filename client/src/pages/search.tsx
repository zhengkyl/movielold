import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useState } from "react";
import MovieSearchField from "../components/MovieSearchField";
import {
  MovieResult,
  useAutocompleteMovies,
} from "../hooks/useAutocompleteMovies";

const MovieItem = (props: MovieResult) => {
  const image = (posterPath: string) =>
    `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={image(props.posterPath)}
        alt={`${props.title} poster`}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {props.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {props.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SearchPage = () => {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [query, setQuery] = useState("")

  const handleSelect = (value: string) => {
    setQuery(value);
    // if (search.result?.query === searchText) {
    //   setMovies(search.result.results);
    //   return;
    // }
  };

  return (
    <Box>
        <MovieSearchField onSelect={handleSelect}/>
      {movies.map((movie) => (
        <MovieItem {...movie} key={movie.id} />
      ))}
    </Box>
  );
};

export default SearchPage;
