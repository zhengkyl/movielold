export interface MovieResult {
  title: string;
  posterPath: string;
  id: number;
  overview: string;
  year: string;
}

export interface SearchOptions {
  /** Default: 5 */
  limit?: number;
  /** Default: 1 */
  page?: number;
  /** Specific movie id, to put at front of list */
  id?: number;
}

const searchMovies = async (
  query: string,
  options: SearchOptions = {},
  abortSignal?: AbortSignal
): Promise<MovieResult[]> => {
  if (!query) return [];

  const { page = 1, limit = 5, id } = options;

  const response = await fetch(
    `http://localhost:5000/api/search?query=${query}&limit=${limit}&page=${page}`,
    {
      signal: abortSignal,
    }
  );
  if (!response.ok) throw new Error("Failed searchMovies");

  const json = await response.json();

  const results: MovieResult[] = json.results;
  
  if (!id) return results;

  const found = results.findIndex((m) => m.id === id);
  if (found !== -1) {
    // Place desired movie at front of list
    results.unshift(results.splice(found, 1)[0]);
  }

  return results;
};

// GET /configuration
// get base_url, poster_sizes

// GET /genre/movie/list
// get array of key values mapping genre id's to genre names

const MovieService = {
  searchMovies,
};

export default MovieService;
