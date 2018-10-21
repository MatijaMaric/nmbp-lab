"use strict";
const express = require("express");
const indexRoute = require("./routes/index");
const bodyParser = require("body-parser");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.config();
        this.routes();
    }
    config() {
    }
    routes() {
        var router = express.Router();
        var movies = new indexRoute.Movies();
        var queries = new indexRoute.Queries();
        router.get('/api/movies', (req, res, next) => movies.all(req, res, next));
        router.post('/api/movies/add', (req, res, next) => movies.add(req, res, next));
        router.get('/api/movies/:id', (req, res, next) => movies.getById(req, res, next));
        router.get('/api/movies/search/:query', (req, res, next) => movies.search(req, res, next));
        router.get('/api/movies/suggest/:query', (req, res, next) => movies.suggest(req, res, next));
        router.get('/api/query/log/:query', (req, res, next) => queries.log(req, res, next));
        router.get('/api/query/pivot/day/:startDate/:endDate', (req, res, next) => queries.byHour(req, res, next));
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
