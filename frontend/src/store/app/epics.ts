import { Epic, combineEpics } from "redux-observable";
import { RootAction } from '..';
import { map } from 'rxjs/operators';
import { fetchMovies } from '../movies/actions';

const appInitFlow: Epic<RootAction> = (action$) => 
    action$.ofType('@App/Initialization').pipe(map(() => fetchMovies.request()));

const appInitEpic = combineEpics(appInitFlow);
export default appInitEpic;