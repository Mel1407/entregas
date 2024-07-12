import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = newSchema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
    unique: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

productSchema.plugin(mongoosePaginate);

export const productModel = model("product", productSchema);
