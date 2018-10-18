import { Action } from 'redux';
import * as moviesConstants from '../constants/movies';

export interface GetMoviesAction extends Action {
    type: moviesConstants.GET_MOVIES
}

export type MoviesAction = GetMoviesAction;

export function getMovies(): GetMoviesAction {
    return {
        type: moviesConstants.GET_MOVIES
    }
}