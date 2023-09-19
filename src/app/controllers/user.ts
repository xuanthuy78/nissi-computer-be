import HttpStatusCode from "../../exceptions/HttpStatusCode";
import { usersRepositories } from "../repositories";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const user = await usersRepositories.register({
      name,
      email,
      password,
      phone,
      address,
    });

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user successfully",
      data: user,
    });
  } catch (exception: any) {
    console.log(exception);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot create user:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let existingUser = await usersRepositories.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot create user:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default { register, login };
