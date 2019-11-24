import express from "express";
import cors from "cors";
// eslint-disable-next-line no-unused-vars
import database from "./config/database";
import "dotenv/config";
import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
