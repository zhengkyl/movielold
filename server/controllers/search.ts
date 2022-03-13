import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import fetch from "node-fetch";
import config from "../config/config";

const searchUrl = (query, page = 1) =>
  `${config.tmdb.apiUrl}/search/movie?api_key=${config.tmdb.apiKey}&query=${query}&page=${page}`;

interface RawMovieResult {
  poster_path: string;
  backdrop_path: string; // potentially useful for themed page
  overview: string;
  id: string;
  title: string;
  release_date: string;
}

interface SearchResponse {
  page: number;
  results: RawMovieResult[];
}

export const getMovies: RequestHandler = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty) {
    return res
      .status(400)
      .json({ message: "Bad search input", errors: validationErrors.array() });
  }
  // Validation ensures query is string, page is int
  const { query, page, limit } = req.query;
  const pageNum = page ? parseInt(page as string) : 1;
  const limitNum = limit ? parseInt(limit as string) : 20; // tmdb default page size

  try {
    const searchRes = await fetch(searchUrl(query, pageNum));
    if (!searchRes.ok) {
      throw new Error("Search Failed");
    }
    const data: SearchResponse = (await searchRes.json()) as SearchResponse;
    const movies = data.results.slice(0, limitNum).map((rawMovie) => {
      const [year, _month, _day] = rawMovie.release_date.split('-');
      return {
        posterPath: rawMovie.poster_path,
        overview: rawMovie.overview,
        id: rawMovie.id,
        title: rawMovie.title,
        year,
      };
    });
    res.status(200).json({ page: pageNum, results: movies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
