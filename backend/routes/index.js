"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require("../db");
var Route;
(function (Route) {
    class Movies {
        all(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield db.query("SELECT movieid, title, categories, summary, description FROM movies", []);
                res.send(result.rows);
            });
        }
        add(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const values = req.body;
                const result = yield db.query("INSERT INTO movies(title, categories, summary, description) " +
                    "VALUES ($1, $2, $3, $4)", [
                    values["title"],
                    values["categories"],
                    values["summary"],
                    values["description"]
                ]);
                console.log(result);
                res.send(req.body);
            });
        }
        getById(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const result = yield db.query("SELECT movieid, title, categories, summary, description FROM movies WHERE movieid = $1", [id]);
                res.send(result.rows);
            });
        }
        search(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = req.params.query;
                const result = yield db.query("SELECT movieid, " +
                    "ts_headline(title, to_tsquery($1)) as title, " +
                    "ts_headline(categories, to_tsquery($1)) as categories, " +
                    "ts_headline(summary, to_tsquery($1)) as summary, " +
                    "ts_headline(description, to_tsquery($1)) as description, " +
                    "ts_rank(array[0.4,0.3,0.1,1.0], search_vector, to_tsquery('english', $1)) as rank " +
                    "FROM movies_vectorized " +
                    "WHERE search_vector @@ to_tsquery('english', $1) " +
                    "ORDER BY rank DESC", [query]);
                res.send(result.rows);
            });
        }
        suggest(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = req.params.query;
                const result = yield db.query("SELECT title, similarity(title || summary, $1) FROM movies ORDER BY similarity DESC LIMIT 5", [query]);
                res.send(result.rows);
            });
        }
    }
    Route.Movies = Movies;
    class Queries {
        log(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = req.params.query;
                const timestamp = new Date();
                const result = yield db.query("INSERT INTO queries(query, timestamp) VALUES ($1, $2)", [query, timestamp]);
                res.send({ query, timestamp });
            });
        }
        byHour(req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                const { startDate, endDate } = req.params;
                const hoursResult = yield db.query("SELECT DISTINCT EXTRACT(HOUR FROM timestamp) as hour FROM queries WHERE timestamp BETWEEN $1 AND $2", [startDate, endDate]);
                const hours = hoursResult.rows.map(row => row["hour"]);
                const pivotResult = yield db.query("SELECT * FROM crosstab ('SELECT query, " +
                    "EXTRACT(HOUR FROM timestamp) as hour, COUNT(query) FROM queries " +
                    "WHERE timestamp BETWEEN $1 AND $2 " +
                    "GROUP BY query, hour " +
                    "ORDER BY query, hour' , 'SELECT DISTINCT EXTRACT(HOUR FROM timestamp) as hour FROM queries " +
                    "ORDER BY hour') AS pivotTable (query text, a int) ORDER BY query;", [startDate, endDate]);
                res.send(pivotResult.rows);
            });
        }
    }
    Route.Queries = Queries;
})(Route || (Route = {}));
module.exports = Route;
