import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "src/store";
import { Movie } from "src/store/movies/types";
import MovieTile from 'src/components/movieTile/movieTile';

import './moviesListContainer.css';

export interface MoviesListProps {
  movies: Movie[];
}

function mapStateToProps(state: ApplicationState): Partial<MoviesListProps> {
  return {
    movies: state.movies.movies
  };
}

class MoviesList extends React.Component<MoviesListProps> {
  public render(): React.ReactNode {
    const { movies } = this.props;
    return (
      <div className="movies-list-container">
        {movies.map(movie => (
          <MovieTile key={movie.movieid} movie={movie} />
        ))}
      </div>
    );
  }
}

const moviesListContainer = connect(
  mapStateToProps
)(MoviesList);
export { moviesListContainer as MoviesList };