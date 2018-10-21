import { ActionType } from "typesafe-actions";

import * as movies from "./actions";

export type MoviesAction = ActionType<typeof movies>;

export interface MoviesState {
  movies: Movie[];
  suggestions: string[];
}

export interface Movie {
  movieid?: number;
  title: string;
  categories: string;
  summary: string;
  description: string;
  rank?: number;
}
