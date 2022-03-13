import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useAsyncAbortable } from "react-async-hook";
import useConstant from "use-constant";

interface Search {
  query: string;
  results: MovieResult[];
}

export interface MovieResult {
  title: string;
  posterPath: string;
  id: string;
  overview: string;
  year: string;
}

const searchMovies = async (
  query: string,
  abortSignal: AbortSignal,
  { limit = 5 }
): Promise<Search> => {
  const response = await fetch(
    `http://localhost:5000/api/search?query=${query}&limit=${limit}`,
    {
      signal: abortSignal,
    }
  );
  if (!response.ok) throw new Error("Failed searchMovies");

  const json = await response.json();
  return {
    query,
    results: json.results,
  };
};

export const useAutocompleteMovies = () => {
  const [searchText, setSearchText] = useState("");

  const debouncedSearchMovies = useConstant(() =>
    AwesomeDebouncePromise(searchMovies, 500)
  );
  const search = useAsyncAbortable<Search>(
    async (abortSignal, text) => {
      if (text.length === 0) return { query: "", results: [] };

      return debouncedSearchMovies(text, abortSignal, { limit: 10 });
    },
    [searchText],
    { setLoading: (state) => ({ ...state, loading: true }) }, // keep old data while fetching
  );

  return {
    searchText,
    setSearchText,
    search,
  };
};
