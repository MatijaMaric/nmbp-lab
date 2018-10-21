import * as React from "react";
import { Movie } from "src/store/movies/types";

import "./movieTile.css";

export interface MovieTileProps {
  movie: Movie;
}

export default class MovieTile extends React.Component<MovieTileProps> {
  public render(): React.ReactNode {
    const { title, summary, description, categories, rank } = this.props.movie;
    return (
      <div className="movie-tile">
        <div
          className="movie-tile__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="movie-tile__categories"
          dangerouslySetInnerHTML={{ __html: categories }}
        />
        <div
          className="movie-tile__summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        <div
          className="movie-tile__description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {rank && <div className="movie-tile__rank">Rank: {rank}</div>}
      </div>
    );
  }
}
