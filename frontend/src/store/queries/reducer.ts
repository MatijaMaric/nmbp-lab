import { QueriesState, QueryAction } from "./types";
import { Reducer } from 'redux';

const initialState: QueriesState = {
    queries: []
}

const reducer: Reducer<QueriesState> = (state = initialState, action: QueryAction) => {
    switch (action.type) {

    }
    return state;
}

export { reducer as QueryReducer };