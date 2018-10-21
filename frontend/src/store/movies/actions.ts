import { createAsyncAction } from "typesafe-actions";
import { Movie } from "./types";

export const fetchMovies = createAsyncAction(
  "@Movies/FETCH_MOVIES_REQUEST",
  "@Movies/FETCH_MOVIES_SUCCESS",
  "@Movies/FETCH_MOVIES_FAILURE"
)<void, Movie[], Error>();

export const addMovie = createAsyncAction(
  "@Movies/ADD_MOVIE_REQUEST",
  "@Movies/ADD_MOVIE_SUCCESS",
  "@Movies/ADD_MOVIE_FAILURE"
)<Movie, Movie, Error>();

export const getMovieById = createAsyncAction(
  "@Movies/GET_MOVIE_BY_ID_REQUEST",
  "@Movies/GET_MOVIE_BY_ID_SUCCESS",
  "@Movies/GET_MOVIE_BY_ID_FAILURE"
)<{ id: number }, Movie, Error>();

export const searchMovie = createAsyncAction(
    "@Movies/SEARCH_MOVIE_REQUEST",
    "@Movies/SEARCH_MOVIE_SUCCESS",
    "@Movies/SEARCH_MOVIE_FAILURE"
)<string, Movie[], Error>();

export const suggestSearch = createAsyncAction(
  "@Movies/SUGGEST_SEARCH_REQUEST",
  "@Movies/SUGGEST_SEARCH_SUCCESS",
  "@Movies/SUGGEST_SEARCH_FAILURE"
)<string, { title: string, similarity: number }[], Error>();