import { combineEpics, Epic } from "redux-observable";
import { RootAction, ApplicationState } from "..";
import { ObservableDependecies } from "src/configureStore";
import { filter, mergeMap, map } from "rxjs/operators";
import { isActionOf, ActionType } from "typesafe-actions";
import { logQuery, pivotByHour, pivotByDay } from "./actions";
import { Query } from "./types";
import { searchMovie } from "../movies/actions";

export const logAfterSearch: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, {}) =>
  action$
    .ofType("@Movies/SEARCH_MOVIE_REQUEST")
    .pipe(
      map((action: ActionType<typeof searchMovie.request>) =>
        logQuery.request(action.payload)
      )
    );

const logQueryUrl = (query: string) => `/api/query/log/${query}`;
export const logQueryFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { getJSON }) =>
  action$.pipe(
    filter(isActionOf(logQuery.request)),
    mergeMap(action =>
      getJSON<Query>(logQueryUrl(action.payload)).pipe(
        map(response => logQuery.success(response))
      )
    )
  );

const pivotByHourUrl = "/api/query/pivot/hour";
export const pivotByHourFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { post }) =>
  action$.pipe(
    filter(isActionOf(pivotByHour.request)),
    mergeMap(action =>
      post(pivotByHourUrl, action.payload).pipe(
        map(response => logQuery.success(response.response))
      )
    )
  );

const pivotByDayUrl = "/api/query/pivot/day";
export const pivotByDayFlow: Epic<
  RootAction,
  RootAction,
  ApplicationState,
  ObservableDependecies
> = (action$, state, { post }) =>
  action$.pipe(
    filter(isActionOf(pivotByDay.request)),
    mergeMap(action =>
      post(pivotByDayUrl, action.payload).pipe(
        map(response => logQuery.success(response.response))
      )
    )
  );

const queryEpic = combineEpics(
  logQueryFlow,
  logAfterSearch,
  pivotByHourFlow,
  pivotByDayFlow
);

export default queryEpic;
