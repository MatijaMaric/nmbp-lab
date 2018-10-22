import * as React from "react";
import { ApplicationState } from "src/store";
import { Movie } from "src/store/movies/types";
import { addMovie } from "src/store/movies/actions";
import { connect } from "react-redux";

import "./addMovieForm.css";
import Button from "src/components/button/button";

export interface AddMovieFormProps {
  addMovie(movie: Movie): void;
}

export interface AddMovieFormState {
  form: {
    [key: string]: string;
  };
}

function mapStateToProps(state: ApplicationState): Partial<AddMovieFormProps> {
  return {};
}

class AddMovieForm extends React.Component<
  AddMovieFormProps,
  AddMovieFormState
> {
  constructor(props: AddMovieFormProps) {
    super(props);

    this.state = {
      form: {}
    };
  }

  public render(): React.ReactNode {
    return (
      <form className="add-movie-form" onSubmit={this._onSubmit}>
        {this._renderField("Title", "title")}
        {this._renderField("Categories", "categories")}
        {this._renderField("Summary", "summary")}
        {this._renderField("Description", "description", true)}
        <Button label="Add" onClick={this._submitAdd} />
      </form>
    );
  }

  private _renderField(label: string, field: string, textArea?: boolean) {
    return (
      <div className="form-field">
        <div className="form-field__label">{label}: </div>
        {textArea ? (
          <textarea
            className="form-field__textarea"
            name={field}
            onChange={this.handleInputChange}
            value={this.state.form[field]}
          />
        ) : (
          <input
            className="form-field__text"
            type="text"
            name={field}
            onChange={this.handleInputChange}
            value={this.state.form[field]}
          />
        )}
      </div>
    );
  }

  private _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this._submitAdd();
    event.preventDefault();
  };

  private _submitAdd = () => {
    const form = this.state.form;
    if (form.title && form.categories && form.summary && form.description) {
      const movie: Movie = {
        title: form["title"],
        categories: form["categories"],
        summary: form["summary"],
        description: form["description"]
      };

      this.props.addMovie(movie);
    }
    this.setState({
      form: {}
    });
  };

  private handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  };
}

const addMovieFormContainer = connect(
  mapStateToProps,
  {
    addMovie: addMovie.request
  }
)(AddMovieForm);
export { addMovieFormContainer as AddMovieForm };
