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
      const query = req.params.query;
      const timestamp = new Date();
      const result = await db.query(
        "INSERT INTO queries(query, timestamp) VALUES ($1, $2)",
        [query, timestamp]
      );
      res.send({ query, timestamp });
    }

    public async byHour(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const {
        startDate,
        endDate
      }: { startDate: Date; endDate: Date } = req.body;
      
      const hoursResult = await db.query(
        "SELECT DISTINCT EXTRACT(HOUR FROM timestamp) as hour FROM queries WHERE timestamp BETWEEN $1 AND $2",
        [startDate, endDate]
      );
      const hours = hoursResult.rows.map(row => row["hour"]);

      const pivotResult = await db.query(
        "SELECT * FROM crosstab ('SELECT query, " +
          "EXTRACT(HOUR FROM timestamp) as hour, COUNT(query) FROM queries " +
          "WHERE timestamp BETWEEN $1 AND $2 " +
          "GROUP BY query, hour " +
          "ORDER BY query, hour' , 'SELECT DISTINCT EXTRACT(HOUR FROM timestamp) as hour FROM queries " +
          "ORDER BY hour') AS pivotTable (query text, " +
          hours.map(hour => `h${hour} int `).join(', ') +
          ") ORDER BY query;",
        [startDate, endDate]
      );

      res.send({
        rows: pivotResult.rows,
        cols: pivotResult.fields.map(field => field.name)
      });
    }

    public async byDay(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const {
        startDate,
        endDate
      }: { startDate: Date; endDate: Date } = req.body;
      const datesResult = await db.query(
        "SELECT DISTINCT date(timestamp) FROM queries WHERE timestamp BETWEEN $1 AND $2",
        [startDate, endDate]
      );
      const dates = datesResult.rows.map(row => row["date"] as Date);

      const pivotResult = await db.query(
        "SELECT * FROM crosstab ('SELECT query, " +
          "date(timestamp), COUNT(query) FROM queries " +
          "WHERE timestamp BETWEEN $1 AND $2 " +
          "GROUP BY query, date " +
          "ORDER BY query, date' , 'SELECT date(timestamp) FROM queries " +
          "ORDER BY date') AS pivotTable (query text, " +
          dates.map(date => `d${date.getDate}_${date.getMonth}_${date.getFullYear} int `).join(', ') +
          ") ORDER BY query;",
        [startDate, endDate]
      );

      res.send({
        rows: pivotResult.rows,
        cols: pivotResult.fields.map(field => field.name)
      });

    }
  }
}

export = Route;
