import { createAsyncAction } from 'typesafe-actions';
import { Query } from './types';

export const logQuery = createAsyncAction(
    "@Query/LOG_QUERY_REQUEST",
    "@Query/LOG_QUERY_SUCCESS",
    "@Query/LOG_QUERY_FAILURE",
)<string, Query, Error>();