import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsyncAbortable } from "react-async-hook";
import useConstant from "use-constant";
import MovieService, { MovieResult } from "../services/MovieService";

export const useAutocompleteMovies = () => {
  const [searchText, setSearchText] = useState("");

  const debouncedSearchMovies = useConstant(() =>
    AwesomeDebouncePromise(MovieService.searchMovies, 500)
  );
  const search = useAsyncAbortable<MovieResult[]>(
    async (abortSignal, text) => {
      if (text.length === 0) return [];

      return debouncedSearchMovies(text, { limit: 10 }, abortSignal);
    },
    [searchText],
    { setLoading: (state) => ({ ...state, loading: true }) } // keep old data while fetching
  );

  return {
    searchText,
    setSearchText,
    search,
  };
};
