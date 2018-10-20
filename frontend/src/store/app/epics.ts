import { Epic, combineEpics } from "redux-observable";
import { RootAction, ApplicationState } from '..';
import { map } from 'rxjs/operators';
import { fetchMovies } from '../movies/actions';

const appInitFlow: Epic<RootAction, RootAction, ApplicationState, void> = (action$, state) => 
    action$.ofType('@App/Initialization').pipe(map(() => fetchMovies.request()));

const appInitEpic = combineEpics(appInitFlow);
export default appInitEpic;