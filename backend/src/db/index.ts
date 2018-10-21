/// <reference path="../_all.d.ts" />
"use strict";

import { Pool, QueryResult, PoolClient } from 'pg';
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    port: 5432,
    database: 'nmbp'
});

export function query(queryString: string, values: any[]): Promise<QueryResult> {
    const start = Date.now();
    return pool.query(queryString, values)
        .then((result: QueryResult) => {
            const duration = Date.now() - start;
            console.log('Executed query: ', { queryString, duration, rows: result.rowCount });
            return result;
        });
}

export function getClient(): Promise<PoolClient> {
    return pool.connect();
}