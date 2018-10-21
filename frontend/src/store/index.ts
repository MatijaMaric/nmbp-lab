import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { AppAction } from "./app/types";
import { MoviesReducer } from "./movies/reducer";
import { MoviesAction, MoviesState } from "./movies/types";
import moviesEpic from './movies/epics';
import appInitEpic from './app/epics';
import { NavigationAction, NavigationState } from './navigation/types';
import { NavigationReducer } from './navigation/reducer';
import { QueryAction, QueriesState } from './queries/types';
import { QueryReducer } from './queries/reducer';
import queryEpic from './queries/epics';

export interface ApplicationState {
  movies: MoviesState;
  navigation: NavigationState;
  query: QueriesState;
}

export const rootReducer = combineReducers<ApplicationState>({
  movies: MoviesReducer,
  navigation: NavigationReducer,
  query: QueryReducer
});

export const rootEpic = combineEpics(
    appInitEpic,
    moviesEpic,
    queryEpic
);

export type RootAction = AppAction | MoviesAction | NavigationAction | QueryAction;
