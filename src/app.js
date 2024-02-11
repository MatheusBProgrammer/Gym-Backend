import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";

class App {
  constructor() {
    this.server = express();
    mongoose
      .connect(
        `mongodb+srv://matheusbarreto:WoCL7s9VsGOKQeVG@cluster0.adxucet.mongodb.net/?retryWrites=true&w=majority
`
      )
      .then(() => console.log("Servidor conectado com sucesso"))
      .catch((error) => console.log("Erro ao conectar ao MongoDB", error));
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }
}

export default new App().server;
