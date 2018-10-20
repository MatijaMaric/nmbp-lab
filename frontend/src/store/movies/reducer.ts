import { Reducer } from "redux";
import { MoviesState } from './types';

const initialState: MoviesState = {
    movies: []
};

const reducer: Reducer<MoviesState> = (state = initialState, action) => {
    switch (action.type) {

    }
    return state;
}

export { reducer as MoviesReducer }