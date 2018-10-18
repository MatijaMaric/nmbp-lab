import { combineReducers } from 'redux';
import { moviesReducer, MoviesState } from './moviesReducer';

export interface RootState {
    movies: MoviesState;
}

export const rootReducer = combineReducers<RootState>({
    movies: moviesReducer
});
