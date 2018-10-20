import * as React from 'react';
import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { RootAction } from 'src/actions';
import { RootState } from 'src/reducers';

export interface MoviesListProps {
    movie: string;
}

function mapStateToProps(state: RootState): Partial<MoviesListProps> {
    return {
        movie: state.movies.movie
    };
}

function mapDispatchToProps(dispatch: Dispatch<RootAction>): Partial<MoviesListProps> {
    return {
        
    }
}

class MoviesList extends React.Component<MoviesListProps> {

    public render(): React.ReactNode {
        const {
            movie
        } = this.props;
        return <div>{movie}</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);