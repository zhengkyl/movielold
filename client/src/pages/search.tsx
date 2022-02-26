import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { MovieResult, useSearchMovies } from "../hooks/useSearchMovies";

const MovieItem = (props: MovieResult) => {
  const image = (posterPath) => `https://image.tmdb.org/t/p/w500${posterPath}`;

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
  const { searchText, setSearchText, search } = useSearchMovies();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.result?.query === searchText) {
      setMovies(search.result.results);
    return;
    }
    forceSearch() 
  };
  const forceSearch = async () => {
    await search.execute()
    setMovies(search.result.results)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          autoHighlight
          options={search.result?.results ?? []}
          loading={search.loading}
          inputValue={searchText}
          onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
          onSubmit={() => console.log("sbmit")}
          renderInput={(params) => (
            <TextField {...params} label="Search for movies..." />
          )}
        ></Autocomplete>
        {movies.map((movie) => (
          <MovieItem {...movie} key={movie.id} />
        ))}
      </form>
    </Box>
  );
};

export default SearchPage;
