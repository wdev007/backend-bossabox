import express from "express";
// eslint-disable-next-line no-unused-vars
import database from "./config/database";

import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  database() {}
}

export default new App().server;
