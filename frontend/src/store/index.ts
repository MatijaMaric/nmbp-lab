import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { AppAction } from "./app/types";
import { MoviesReducer } from "./movies/reducer";
import { MoviesAction, MoviesState } from "./movies/types";
import moviesEpic from './movies/epics';
import appInitEpic from './app/epics';

export interface ApplicationState {
  movies: MoviesState;
}

export const rootReducer = combineReducers<ApplicationState>({
  movies: MoviesReducer
});

export const rootEpic = combineEpics(
    appInitEpic,
    moviesEpic
);

export type RootAction = AppAction | MoviesAction;
