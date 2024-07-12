import { productModel } from "../models/products.models.js";

class productService {
  async getAll() {
    return await productModel.find();
  }
  async getById(id) {
    return await productModel.findById(id);
  }
  async create(product) {
    return await productModel.create(product);
  }
  async update(product) {
    return await productModel.update(product);
  }
  async delete(product) {
    return await productModel.delete(product);
  }
}
export default new productService();
