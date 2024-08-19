import UserModel from "../models/user.model";

export class Setup {
  setup = async () => {
    try {
      await this.setupUsers();
    } catch (error) {
      console.log(error);
    }
  };

  setupUsers = async () => {
    const userCount = await UserModel.estimatedDocumentCount();
    if (userCount > 0) return;
    new UserModel({
      nombre: "Miguel Angel",
      edad: 33,
    }).save();
    console.log("Default user created");
  };
}
