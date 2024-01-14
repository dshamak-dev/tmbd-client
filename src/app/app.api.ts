import { MovieDTO } from "src/app/app.model";
import {
  GET,
  apiConfig,
  normalizeAPIURL,
  normalizeURL,
} from "../support/api.utils";

export const getTrending = (): Promise<MovieDTO[]> => {
  return GET("movie/upcoming?language=en-US&page=1", {
    headers: {
      accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return (
        res.results?.map((it) => {
          const { poster_path, backdrop_path } = it;

          return Object.assign(it, {
            poster_path: normalizeURL(apiConfig.PUBLIC_URL, poster_path),
            backdrop_path: normalizeURL(apiConfig.PUBLIC_URL, backdrop_path),
          });
        }) || []
      );
    });
};

export const discoverMovies = (query?: string) => {
  return GET(
    `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return (
        res.results?.map((it) => {
          const { poster_path, backdrop_path } = it;

          return Object.assign(it, {
            poster_path: normalizeURL(apiConfig.PUBLIC_URL, poster_path),
            backdrop_path: normalizeURL(apiConfig.PUBLIC_URL, backdrop_path),
          });
        }) || []
      );
    });
};
