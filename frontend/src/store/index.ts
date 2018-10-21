import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { AppAction } from "./app/types";
import { MoviesReducer } from "./movies/reducer";
import { MoviesAction, MoviesState } from "./movies/types";
import moviesEpic from './movies/epics';
import appInitEpic from './app/epics';
import { NavigationAction, NavigationState } from './navigation/types';
import { NavigationReducer } from './navigation/reducer';

export interface ApplicationState {
  movies: MoviesState;
  navigation: NavigationState
}

export const rootReducer = combineReducers<ApplicationState>({
  movies: MoviesReducer,
  navigation: NavigationReducer
});

export const rootEpic = combineEpics(
    appInitEpic,
    moviesEpic
);

export type RootAction = AppAction | MoviesAction | NavigationAction;
