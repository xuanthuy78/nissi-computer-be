import bcrypt from "bcrypt";
import { User } from "../models";
import Exception from "../../exceptions/Exception";
import { userTypes } from "../../global/common";
import jwt from "jsonwebtoken";

const register = async ({
  name,
  email,
  password,
  phone,
  address,
}: userTypes) => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Exception("Input error", Exception.USER_EXIST);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS as string)
    );

    let user: any = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    user = await user.save();

    return user;
  } catch (exception: any) {
    throw new Exception("Input error", exception.errors);
  }
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let existingUser = await User.findOne({ email });
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "60days",
        }
      );
      return {
        token: token,
      };
    } else {
      throw new Exception("Input error", Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  } else {
    throw new Exception("Input error", Exception.WRONG_EMAIL_AND_PASSWORD);
  }
};

export default {
  register,
  login,
};
