import * as React from "react";

import { connect } from "react-redux";
import { appInit } from "src/store/app/actions";
import "./App.css";
import { MoviesList } from "../moviesList/moviesListContainer";
import { Navigation } from "../navigation/navigationContainer";
import { ApplicationState } from "src/store";
import { NavigationEnum } from 'src/store/navigation/types';
import { AddMovieForm } from '../addMovieForm/addMovieForm';
import { SearchForm } from '../searchForm/searchForm';

export interface AppProps {
  appInit(): void;
  selectedItem: NavigationEnum;
}

function mapStateToProps(state: ApplicationState): Partial<AppProps> {
  return {
    selectedItem: state.navigation.selectedItem
  };
}

class App extends React.Component<AppProps> {
  public componentDidMount() {
    this.props.appInit();
  }

  public render() {
    return (
      <div className="app-container">
        <Navigation />
        <div className="app-body">
          <div className="app-body__left">
            {this._renderFilter()}
          </div>
          <div className="app-body__right">
            <MoviesList />
          </div>
        </div>
      </div>
    );
  }

  private _renderFilter() {
    const {
      selectedItem
    } = this.props;

    switch (selectedItem) {
      case NavigationEnum.Add: 
        return <AddMovieForm />;
      case NavigationEnum.Search:
        return <SearchForm />
    }
    return <div>SARMA</div>
  }
}

const app = connect(
  mapStateToProps,
  { appInit }
)(App);
export { app as App };
