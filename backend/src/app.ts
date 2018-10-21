/// <reference path="_all.d.ts" />
"use strict";

import * as express from 'express';
import * as indexRoute from './routes/index';
import bodyParser = require('body-parser');

class Server {
    public app: express.Express;

    public static bootstrap(): Server {
        return new Server();
    }

    public constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.config();
        this.routes();
    }

    private config() {

    }

    private routes() {
        var router = express.Router();

        var movies: indexRoute.Movies = new indexRoute.Movies();

        router.get('/api/movies', (req, res, next) => movies.all(req, res, next));
        router.post('/api/movies/add', (req, res, next) => movies.add(req, res, next));
        router.get('/api/movies/:id', (req, res, next) => movies.getById(req, res, next))
        router.get('/api/movies/search/:query', (req, res, next) => movies.search(req, res, next))
        router.get('/api/movies/suggest/:query', (req, res, next) => movies.suggest(req, res, next))

        this.app.use(router);
    }
}

var server = Server.bootstrap();
export = server.app;