import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAsync } from "react-async-hook";
import MovieSearchField from "../components/MovieSearchField";
import MovieService, { MovieResult } from "../services/MovieService";
import { css } from "@emotion/react";

/** Parent must have overflow: hidden */
const oneLineEllipsis = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

/** Parent must have overflow: hidden
 *
 * This is the least hacky way for multiline ellipsis text
 */
const multiLineEllipsis = (lines: number) => css`
  text-overflow: ellipsis;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
`;
const image = (posterPath: string) =>
  `https://image.tmdb.org/t/p/w500${posterPath}`;

interface MovieItemProps {
  movie: MovieResult;
  truncateTitle?: boolean;
  descriptionLines?: number;
}
const MovieItem = ({movie, truncateTitle=true, descriptionLines=2, ...otherProps}: MovieItemProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        my: 2,
      }}
      component="li"
      variant="outlined"
      {...otherProps}
    >
      <CardMedia
        component="img"
        sx={{
          height: 150,
          width: 100,
          m: 1,
          mr: 0,
          borderRadius: 1,
          border: "1px solid rgba(0, 0, 0, 0.12)",
          flexShrink: 0,
        }}
        image={image(movie.posterPath)}
        alt={`${movie.title} poster`}
      />
      <CardContent sx={{ overflow: "hidden" }}>
        <Typography
          css={truncateTitle && oneLineEllipsis}
          component="h2"
          variant="h6"
          fontWeight={700}
        >
          {movie.title}
        </Typography>
        <Typography component="span" variant="subtitle1" color="text.secondary">
          {movie.year}
        </Typography>
        <Typography
          css={multiLineEllipsis(descriptionLines)}
          sx={{ mt: 1 }}
          component="p"
          variant="body1"
        >
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SearchPage = () => {
  // const [movies, setMovies] = useState<MovieResult[]>([]);
  const [query, setQuery] = useState("");

  const movieSearch = useAsync(MovieService.searchMovies, [query]);

  const handleSelect = (value: string) => {
    setQuery(value);
  };

  return (
    <Box>
      <MovieSearchField onSelect={handleSelect} />
      {movieSearch.loading && <CircularProgress />}
      {movieSearch.error && <div>There was an error with moviesearch</div>}
      {movieSearch.result &&
        movieSearch.result.map((movie, index) =>
          index ? (
            <MovieItem movie={movie} key={movie.id} />
          ) : (
            <MovieItem movie={movie} truncateTitle={false} descriptionLines={5} key={movie.id} />
          )
        )}
    </Box>
  );
};

export default SearchPage;
