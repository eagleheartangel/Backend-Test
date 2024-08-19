import { UserController } from "../controllers/user.controller";
import { BaseRouter } from "./base.router";

export class TestRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }
  routes() {
    this.router.post("/user", (req, res) =>
      this.controller.createUser(req, res)
    );
    this.router.get("/users", (req, res) => this.controller.getUsers(req, res));
    this.router.get("/users/:id", (req, res) =>
      this.controller.getUserById(req, res)
    );
    this.router.put("/user/:id", (req, res) =>
      this.controller.modifyUser(req, res)
    );
    this.router.delete("/user/:id", (req, res) =>
      this.controller.deleteUser(req, res)
    );
  }
}
