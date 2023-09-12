import mongoose from "mongoose";

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: {
        validator: (name: string) => name.length > 3,
        message: "Name must be at least 3 characters",
      },
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", Category);
