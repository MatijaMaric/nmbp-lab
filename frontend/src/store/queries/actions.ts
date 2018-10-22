import { createAsyncAction } from 'typesafe-actions';
import { Query } from './types';

export const logQuery = createAsyncAction(
    "@Query/LOG_QUERY_REQUEST",
    "@Query/LOG_QUERY_SUCCESS",
    "@Query/LOG_QUERY_FAILURE",
)<string, Query, Error>();

export const pivotByDay = createAsyncAction(
    "@Query/PIVOT_BY_DAY_REQUEST",
    "@Query/PIVOT_BY_DAY_SUCCESS",
    "@Query/PIVOT_BY_DAY_FAILURE"
)<{startDate: Date; endDate: Date}, any, Error>();

export const pivotByHour = createAsyncAction(
    "@Query/PIVOT_BY_HOUR_REQUEST",
    "@Query/PIVOT_BY_HOUR_SUCCESS",
    "@Query/PIVOT_BY_HOUR_FAILURE"
)<{startDate: Date; endDate: Date}, any, Error>();