import mongoose from "mongoose";

const Category = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", Category);
