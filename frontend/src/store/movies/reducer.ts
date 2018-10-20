import { Reducer } from "redux";
import { MoviesState, MoviesAction } from "./types";
import * as movies from "./actions";
import { getType } from "typesafe-actions";

const initialState: MoviesState = {
  movies: []
};

const reducer: Reducer<MoviesState> = (
  state = initialState,
  action: MoviesAction
) => {
  switch (action.type) {
    case getType(movies.fetchMovies.success): {
      return {
        ...state,
        movies: action.payload
      };
    }
  }
  return state;
};

export { reducer as MoviesReducer };
