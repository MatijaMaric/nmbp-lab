"use strict";
const express = require("express");
const indexRoute = require("./routes/index");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
    }
    routes() {
        var router = express.Router();
        var movies = new indexRoute.Movies();
        router.get('/api/movies', (req, res, next) => movies.all(req, res, next));
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
