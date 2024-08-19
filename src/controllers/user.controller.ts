import { Request, Response } from "express";
import UserModel from "../models/user.model";

export class UserController {
  constructor() {}

  createUser = async (req: Request, res: Response) => {
    try {
      const { nombre, edad } = req.body;
      const user = new UserModel({ nombre, edad });
      await user.save();

      return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario" });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();

      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await UserModel.find({ id });

      if (user.length === 0)
        return res.status(404).json({ message: "Usuario no encontrado" });

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  };

  modifyUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // No incluimos `edad` porque la incrementaremos automáticamente
      const user = await UserModel.findOne({ id });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      user.edad += 1;
      const updatedUser = await user.save();

      return res.status(200).json({
        message: `El registro de ${updatedUser.nombre}, próximamente tendrá <${updatedUser.edad} + 1> años.`,
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error al modificar usuario" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findOneAndDelete({ id });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json({ message: "Usuario eliminado", user });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar usuario" });
    }
  };
}
