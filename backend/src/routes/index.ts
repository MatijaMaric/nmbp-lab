/// <reference path="../_all.d.ts" />
"use strict";

import * as express from "express";
import * as db from "../db";

namespace Route {
  export class Movies {
    public async all(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const result = await db.query(
        "SELECT movieid, title, categories, summary, description FROM movies",
        []
      );
      res.send(result.rows);
    }

    public async add(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const values = req.body;
      const result = await db.query(
        "INSERT INTO movies(title, categories, summary, description) " +
          "VALUES ($1, $2, $3, $4)",
        [
          values["title"],
          values["categories"],
          values["summary"],
          values["description"]
        ]
      );
      console.log(result);
      res.send(req.body);
    }

    public async getById(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const id = req.params.id;
      const result = await db.query(
        "SELECT movieid, title, categories, summary, description FROM movies WHERE movieid = $1",
        [id]
      );
      res.send(result.rows);
    }

    public async search(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const query = req.params.query;
      const result = await db.query(
        "SELECT movieid, " +
          "ts_headline(title, to_tsquery($1)) as title, " +
          "ts_headline(categories, to_tsquery($1)) as categories, " +
          "ts_headline(summary, to_tsquery($1)) as summary, " +
          "ts_headline(description, to_tsquery($1)) as description, " +
          "ts_rank(array[0.4,0.3,0.1,1.0], search_vector, to_tsquery('english', $1)) as rank " +
          "FROM movies_vectorized " +
          "WHERE search_vector @@ to_tsquery('english', $1) " +
          "ORDER BY rank DESC",
        [query]
      );
      res.send(result.rows);
    }

    public async suggest(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const query = req.params.query;
      const result = await db.query(
        "SELECT title, similarity(title || summary, $1) FROM movies ORDER BY similarity DESC LIMIT 5",
        [query]
      );
      res.send(result.rows);
    }
  }

  export class Queries {
    public async log(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
        console.log('lel');
      const query = req.params.query;
      const timestamp = new Date();
      const result = await db.query(
        "INSERT INTO queries(query, timestamp) VALUES ($1, $2)",
        [query, timestamp]
      );
      res.send({ query, timestamp });
    }
  }
}

export = Route;
