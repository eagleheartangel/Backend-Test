import express from "express";
import morgan from "morgan";
import cors from "cors";
import { DataBase } from "./database/database";
import { TestRouter } from "./router/user.router";
import { Setup } from "./libs/default.user";

class App extends DataBase {
  public app: express.Application = express();
  private userRoutes = new TestRouter().router;

  constructor(private readonly init: Setup = new Setup()) {
    super();

    this.middlewares();
    this.app.use("/api", this.routes());
    this.connectDB();
    this.init.setup();
  }

  middlewares(): void {
    this.app.use(morgan("dev"));

    this.app.use(
      cors({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] })
    );

    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(express.json());
  }

  routes(): express.Router[] {
    return [this.userRoutes];
  }
}

new App();
