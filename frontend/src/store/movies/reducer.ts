import { Reducer } from "redux";
import { MoviesState, MoviesAction } from "./types";
import * as movies from "./actions";
import { getType } from "typesafe-actions";

const initialState: MoviesState = {
  movies: [],
  suggestions: []
};

const reducer: Reducer<MoviesState> = (
  state = initialState,
  action: MoviesAction
) => {
  switch (action.type) {
    case getType(movies.fetchMovies.success):
    case getType(movies.searchMovie.success): {
      return {
        ...state,
        movies: action.payload
      };
    }
    case getType(movies.addMovie.success): {
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };
    }
    case getType(movies.suggestSearch.success): {
      return {
        ...state,
        suggestions: action.payload.map(suggestion => suggestion.title)
      }
    }
  }
  return state;
};

export { reducer as MoviesReducer };
