import { Router } from "express";
import { cartService } from "../services/cart.service.js";

const router = Router();

//Se crea el carrito

class cartController {
  async createCart(req, res) {
    try {
      const cart = await cartService.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: `No se pudo crear el carrito: ${error}` });
    }
  }

  //Se obtiene el carrito por ID

  async getCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await cartService.getCart(Number(id));
      if (!cart) {
        return res.status(404).json({ error: "El carrito no existe" });
      }
      res.status(200).json(cart);
    } catch (error) {
      res
        .status(400)
        .json({ error: `No se pudo obtener el carrito: ${error}` });
    }
  }

  //Se agrega un producto al carrito

  async addProductToCart(req, res) {
    const { id, productId } = req.params;
    try {
      const cart = await cartService.addProductToCart(
        Number(id),
        Number(productId)
      );
      res.status(201).json(cart);
    } catch (error) {
      res
        .status(400)
        .json({ error: `No se pudo agregar el producto al carrito: ${error}` });
    }
  }

  //Se elimina el carrito por ID

  async deleteCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await cartService.deleteCart(Number(id));
      res.status(201).json(cart);
    } catch (error) {
      res
        .status(400)
        .json({ error: `No se pudo eliminar el carrito: ${error}` });
    }
  }

  //Se actualiza el carrito por ID

  async updateCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await cartService.updateCart(Number(id));
      res.status(201).json(cart);
    } catch (error) {
      res
        .status(400)
        .json({ error: `No se pudo actualizar el carrito: ${error}` });
    }
  }
}

export default new cartController();
