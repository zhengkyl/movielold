

export interface MovieResult {
  title: string;
  posterPath: string;
  id: string;
  overview: string;
  year: string;
}

interface SearchOptions {
  /** Default: 5 */
  limit?: number;
  /** Default: 1 */
  page?: number;
}

const searchMovies = async (
  query: string,
  options: SearchOptions = {},
  abortSignal?: AbortSignal
): Promise<MovieResult[]> => {
  if (!query) return []

  const { page = 1, limit = 5 } = options;

  const response = await fetch(
    `http://localhost:5000/api/search?query=${query}&limit=${limit}&page=${page}`,
    {
      signal: abortSignal,
    }
  );
  if (!response.ok) throw new Error("Failed searchMovies");

  const json = await response.json();
  return json.results;
};

// GET /configuration
// get base_url, poster_sizes

// GET /genre/movie/list
// get array of key values mapping genre id's to genre names

const MovieService = {
  searchMovies,
};

export default MovieService;
