import { Router } from "express";

import auth from "./app/middlewares/auth";

import ToolsController from "./app/controllers/ToolsController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

const routes = Router();

routes.get("/tools", ToolsController.index);
routes.post("/tools", ToolsController.store);
routes.put("/tools/:id", ToolsController.update);
routes.delete("/tools/:id", ToolsController.delete);

routes.get("/users/me", auth, SessionController.show);
routes.get("/users/log", auth, SessionController.show);
routes.post("/users/login", SessionController.store);
routes.delete("/users/me/logout", auth, SessionController.delete);
routes.delete("/users/me/logoutall", auth, SessionController.deleteAll);

routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);
routes.get("/users/:id", UserController.show);
routes.get("/users", UserController.index);

export default routes;
