import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

cartSchema.plugin(mongoosePaginate);

export const cartModel = model("cart", cartSchema);

cartModel.paginate({}, { page: 1, limit: 10 });
