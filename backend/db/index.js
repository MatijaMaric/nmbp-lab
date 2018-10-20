"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'rainmaker13',
    port: 5432,
    database: 'nmbp'
});
function query(queryString, values) {
    const start = Date.now();
    return pool.query(queryString, values)
        .then((result) => {
        const duration = Date.now() - start;
        console.log('Executed query: ', { queryString, duration, rows: result.rowCount });
        return result;
    });
}
exports.query = query;
function getClient() {
    return pool.connect();
}
exports.getClient = getClient;
