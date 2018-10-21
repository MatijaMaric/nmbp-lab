import { Epic, combineEpics } from "redux-observable";
import { filter, mergeMap, map } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { ApplicationState, RootAction } from "..";
import { fetchMovies, addMovie, getMovieById, searchMovie, suggestSearch } from "./actions";
import { Movie } from "./types";
import { ObservableDependecies } from "src/configureStore";

const moviesApiUrl = "/api/movies";
export const fetchMoviesFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(fetchMovies.request)),
    mergeMap(action =>
      getJSON<Movie[]>(moviesApiUrl).pipe(
        map(response => fetchMovies.success(response))
      )
    )
  );

const addMovieApiUrl = "/api/movies/add";
export const addMovieFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { post }) =>
  action$.pipe(
    filter(isActionOf(addMovie.request)),
    mergeMap(action =>
      post(addMovieApiUrl, action.payload).pipe(
        map(response => addMovie.success(response.response))
      )
    )
  );

const getMovieByIdUrl = (id: number) => `/api/movies/${id}`;
export const getMovieByIdFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(getMovieById.request)),
    mergeMap(action =>
      getJSON<Movie>(getMovieByIdUrl(action.payload.id)).pipe(
        map(response => getMovieById.success(response))
      )
    )
  );

const searchMovieUrl = (query: string) => `/api/movies/search/${query}`;
export const searchMovieFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(searchMovie.request)),
    mergeMap(action =>
      getJSON<Movie[]>(searchMovieUrl(action.payload)).pipe(
        map(response => searchMovie.success(response))
      )
    )
  );

const suggestSearchUrl = (query: string) => `/api/movies/suggest/${query}`;
export const suggestSearchFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(suggestSearch.request)),
    mergeMap(action =>
      getJSON<{ title: string, similarity: number }[]>(suggestSearchUrl(action.payload)).pipe(
        map(response => suggestSearch.success(response))
      )
    )
  );

const moviesEpic = combineEpics(
  fetchMoviesFlow,
  addMovieFlow,
  getMovieByIdFlow,
  searchMovieFlow,
  suggestSearchFlow
);

export default moviesEpic;
