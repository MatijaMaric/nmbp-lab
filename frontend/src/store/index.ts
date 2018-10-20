import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

export interface ApplicationState {

}

export const rootReducer = combineReducers<ApplicationState>({

});

export function* rootSaga() {
    yield all([
        
    ])
}