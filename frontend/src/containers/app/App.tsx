import * as React from "react";
import MoviesList from "src/containers/moviesList/moviesListContainer";

import { connect } from "react-redux";
import { appInit } from "src/store/app/actions";
import "./App.css";

export interface AppProps {
  appInit(): void;
}

function mapStateToProps(props: Partial<AppProps>): Partial<AppProps> {
  return {};
}

class App extends React.Component<AppProps> {
  public componentDidMount() {
    this.props.appInit();
  }

  public render() {
    return <MoviesList />;
  }
}

const app = connect(
  mapStateToProps,
  { appInit }
)(App);
export { app as App };
