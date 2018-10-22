import * as React from "react";
import * as _ from 'lodash';
import { ApplicationState } from "src/store";
import { connect } from "react-redux";

import "./searchForm.css";
import Button from "src/components/button/button";
import { searchMovie, fetchMovies, suggestSearch } from "src/store/movies/actions";
import Highlight from 'react-highlight';

export interface SearchFormProps {
  doSearch(query: string): void;
  getAllMovies(): void;
  suggestions: string[];
  getSuggestions(query: string): void;
}

export interface SearchFormState {
  searchValue: string;
  isAnd: boolean;
}

function mapStateToProps(state: ApplicationState): Partial<SearchFormProps> {
  return {
    suggestions: state.movies.suggestions
  };
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  public constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      searchValue: "",
      isAnd: true
    };
  }

  public render(): React.ReactNode {
    return (
      <div className="search-container">
        <form className="search-form" onSubmit={this._onSubmit}>
          <div className="search-bar">
            <input
              list="suggestions"
              className="search-box"
              type="text"
              name="search"
              onChange={this._onSearchChanged}
            />
            <datalist id="suggestions">
              {this.props.suggestions.map(suggestion => 
                <option value={suggestion} />
              )}
            </datalist>
            <Button label="Search" onClick={this._onSearch} />
          </div>
          <div className="and-or">
            <div>
              <input
                type="radio"
                name="method"
                value="and"
                onChange={this._onMethodChanged}
                checked={this.state.isAnd}
              />
              <label htmlFor="and">AND</label>
            </div>
            <div>
              <input
                type="radio"
                name="method"
                value="or"
                onChange={this._onMethodChanged}
                checked={!this.state.isAnd}
              />
              <label htmlFor="or">OR</label>
            </div>
          </div>
        </form>
        <Highlight className="sql">
          {this._generateSql(this._generateQuery(this.state.searchValue, this.state.isAnd))}
        </Highlight>
      </div>
    );
  }

  private _onSearch = () => {
    if (this.state.searchValue.trim().length === 0) {
      this.props.getAllMovies();
    }
    const query = this._generateQuery(this.state.searchValue, this.state.isAnd);
    this.props.doSearch(query);
  };

  private _generateQuery(searchValue: string, isAnd: boolean): string {
    let phrases = searchValue.match(/("[^"]+"|[^"\s]+)/g) || [];
    phrases = phrases.map(phrase => phrase.split(" ").join(" & "));
    return phrases.join(isAnd ? " & " : " | ");
  }

  private debounceSuggestions = _.debounce(this.props.getSuggestions, 1000);
  private _onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    this.debounceSuggestions(query);
    this.setState({
      searchValue: event.target.value
    });
  }
    

  private _onMethodChanged = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      isAnd: event.target.value === "and"
    });

  private _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this._onSearch();
    event.preventDefault();
  };

  private _generateSql(query: string): string {
    const sql =
      `SELECT \n` +
      ` movieid, \n` +
      ` ts_headline(title, to_tsquery('${query}')) as title, \n` +
      ` ts_headline(categories, to_tsquery('${query}')) as categories, \n` +
      ` ts_headline(summary, to_tsquery('${query}')) as summary, \n` +
      ` ts_headline(description, to_tsquery('${query}')) as description, \n` +
      ` ts_rank(array[0.4,0.3,0.1,1.0], search_vector, to_tsquery('english', '${query}')) as rank \n` +
      `FROM movies_vectorized \n` +
      `WHERE search_vector @@ to_tsquery('english', '${query}') \n` +
      `ORDER BY rank DESC`;
    return sql;
  }
}

const searchFormContainer = connect(
  mapStateToProps,
  {
    doSearch: searchMovie.request,
    getAllMovies: fetchMovies.request,
    getSuggestions: suggestSearch.request
  }
)(SearchForm);
export { searchFormContainer as SearchForm };
