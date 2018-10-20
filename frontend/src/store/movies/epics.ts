import { Epic, combineEpics } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { filter, mergeMap, map } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { ApplicationState, RootAction } from "..";
import { fetchMovies } from "./actions";
import { Movie } from "./types";

const moviesApiUrl = "/api/movies";
export const fetchMoviesFlow: Epic<RootAction, RootAction, ApplicationState, void> = (
  action$,
  state
) =>
  action$.pipe(
    filter(isActionOf(fetchMovies.request)),
    mergeMap(action =>
      ajax
        .getJSON<Movie[]>(moviesApiUrl)
        .pipe(map(response => fetchMovies.success(response)))
    )
  );

const moviesEpic = combineEpics(fetchMoviesFlow);

export default moviesEpic;
