/// <reference path="../_all.d.ts" />
"use strict";

import * as express from 'express';
import * as db from '../db';

module Route {

    export class Movies {

        public async all(req: express.Request, res: express.Response, next: express.NextFunction) {
            const result = await db.query('SELECT movieid, title, categories, summary, description FROM movie', []);
            res.send(result.rows);
        }
    }
}

export = Route;

