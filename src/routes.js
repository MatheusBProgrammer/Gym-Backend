import { Router } from "express";
import SessionController from "./controllers/SessionController";

const routes = new Router();

//rotas
routes.get("/", (req, res) => {
  return res.json({ ok: true });
});
routes.post("/signup", SessionController.store);
routes.get("/showusers", SessionController.index);
routes.get("/showuser/:id", SessionController.show);

export default routes;
