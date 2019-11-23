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

routes.post("/users", UserController.store);

routes.get("/users/me", auth, SessionController.show);
routes.post("/users/login", SessionController.store);
routes.delete("/users/me/logout", auth, SessionController.delete);
routes.delete("/users/me/logoutall", auth, SessionController.deleteAll);

export default routes;
