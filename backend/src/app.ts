/// <reference path="_all.d.ts" />
"use strict";

import * as express from 'express'
import * as indexRoute from './routes/index';

class Server {
    public app;

    public static bootstrap(): Server {
        return new Server();
    }

    public constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {

    }

    private routes() {
        var router = express.Router();

        var movies: indexRoute.Movies = new indexRoute.Movies();

        router.get('/api/movies', (req, res, next) => movies.all(req, res, next));

        this.app.use(router);
    }
}

var server = Server.bootstrap();
export = server.app;