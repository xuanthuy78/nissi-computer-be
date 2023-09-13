import mongoose from "mongoose";
import slugify from "slugify";

const Product = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true },
    productSummary: {
      type: String,
      default: "",
    },
    productImage: {
      type: String,
    },
    imageCollection: [
      {
        type: String,
      },
    ],
    productUrl: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    marketPrice: {
      type: Number,
      default: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    specialOffer: {
      title: { type: String },
    },
    productType: [
      {
        isNew1: { type: Number, default: 0 },
        isHot: { type: Number, default: 0 },
        isSaleOff: { type: Number, default: 0 },
      },
    ],
    weight: {
      type: Number,
      default: 0,
    },
    warranty: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

Product.pre("save", function (next) {
  this.slug = slugify(this.productName, { lower: true });
  next();
});

export default mongoose.model("Product", Product);
