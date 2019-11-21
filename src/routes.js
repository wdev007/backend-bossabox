import { Router } from "express";

import ToolsController from "./app/controllers/ToolsController";

const routes = Router();

routes.get("/tools", ToolsController.index);
routes.post("/tools", ToolsController.store);
routes.put("/tools/:id", ToolsController.update);
routes.delete("/tools/:id", ToolsController.delete);

export default routes;
