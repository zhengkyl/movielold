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
}

const searchMovies = async (query, abortSignal, { limit = 5 }): Promise<Search> => {
  const response = await fetch(`/api/search?query=${query}&limit=${limit}`, {
    signal: abortSignal,
  });
  if (!response.ok) throw new Error("Failed searchMovies");

  const json = await response.json();
  return {
    query,
    results: json.results,
  };
};

export const useSearchMovies = () => {
  const [searchText, setSearchText] = useState("");

  const debouncedSearchMovies = useConstant(() =>
    AwesomeDebouncePromise(searchMovies, 500)
  );
  const search = useAsyncAbortable<Search>(
    async (abortSignal, text) => {
      if (text.length === 0) return { query: "", results: [] };
      return debouncedSearchMovies(text, abortSignal, { limit: 10 });
    },
    [searchText]
  );

  return {
    searchText,
    setSearchText,
    search,
  };
};
