import mongoose from "mongoose";

const Brand = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      validate: {
        validator: (name: string) => name.length > 3,
        message: "Name must be at least 3 characters",
      },
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", Brand);
