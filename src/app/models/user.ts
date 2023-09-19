import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: {
        validator: (name: string) => name.length > 3,
        message: "Name must be at least 3 characters",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [isEmail, "Incorrect email format"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
