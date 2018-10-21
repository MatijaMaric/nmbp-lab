
import * as queries from './actions';
import { ActionType } from 'typesafe-actions';
export type QueryAction = ActionType<typeof queries>;

export interface QueriesState {
    queries: Query[];
}

export interface Query {
    query: string;
    timestamp: Date;
}