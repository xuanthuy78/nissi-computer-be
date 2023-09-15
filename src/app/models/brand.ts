import mongoose from "mongoose";

const Brand = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: {
        validator: (name: string) => name.length > 2,
        message: "Name must be at least 2 characters",
      },
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", Brand);
