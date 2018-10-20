import { createAsyncAction } from "typesafe-actions";
import { Movie } from "./types";

export const fetchMovies = createAsyncAction(
  "@Movies/FETCH_MOVIES_REQUEST",
  "@Movies/FETCH_MOVIES_SUCCESS",
  "@Movies/FETCH_MOVIES_FAILURE"
)<void, Movie[], Error>();
