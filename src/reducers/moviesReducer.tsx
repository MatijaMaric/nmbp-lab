import { MoviesAction } from 'src/actions/movies';
import * as moviesActions from 'src/constants/movies';

export interface MoviesState {
    movie: string;
}

const initialState: MoviesState = {
    movie: "UFO Porno"
}

export function moviesReducer(state: MoviesState = initialState, action: MoviesAction): MoviesState {
    switch (action.type) {
        case moviesActions.GET_MOVIES: {
            return state;
        }
    }
    return state;
}