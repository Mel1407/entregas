import { cartModel } from "../models/cart.models.js";

class cartService {
  async getCart() {
    return await cartModel.find();
  }
  async createCart(cart) {
    return await cartModel.create(cart);
  }
  async addProductToCart(cart) {
    return await cartModel.addProductToCart(cart);
  }
}
export default new cartService();
