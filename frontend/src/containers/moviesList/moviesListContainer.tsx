import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState, RootAction } from "src/store";
import { Movie } from "src/store/movies/types";

export interface MoviesListProps {
  movies: Movie[];
}

function mapStateToProps(state: ApplicationState): Partial<MoviesListProps> {
  return {
    movies: state.movies.movies
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<RootAction>
): Partial<MoviesListProps> {
  return {};
}

class MoviesList extends React.Component<MoviesListProps> {
  public render(): React.ReactNode {
    const { movies } = this.props;
    return (
      <div>
        {movies.map(movie => (
          <div key={movie.movieid}>{movie.title}</div>
        ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);
