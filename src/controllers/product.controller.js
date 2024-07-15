import { productService } from "../services/product.service.js"
import { Router } from "express";

const router = Router();

class productController{

  //Se obtienen todos los productos
  async getAll(req, res){
    const {page, limit} = req.query;
    try{
      const product = await productService.paginate({}, {page: 1, limit: 10});
      res.render("product", {product});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }

  //Se obtiene un producto por ID
  async getById(req, res){
    try{
      const {id} = req.params,
      const product = await productService.findById(req.param.id);

      if(!product){
        return res.status(404).json({error: "Producto no encontrado"});
      }
      res.json(product);
    } catch(error){
      res.status(500).json({error});
    }
  }

  //Se crea un producto
  async create(req, res){
    try{
      const {title, description, price, thumbnail, code, stock, status} = req.body;

      if(!title || !description || !price || !thumbnail || !code|| !stock|| !status||){
        return res.status(400).json({error: "Faltan datos requeridos"});
      }
      const product = new productService({title, description, price, thumbnail, code, stock, status});
      await product.save();
      res.json(product);
    } catch(error){
      res.status(500).json({error});
    }
  }

  //Se actualiza producto
  async update(req, res){
    try{
      const {id} = req.params,
      const {title, description, price, thumbnail, code, stock, status} = req.body;

      const product = await productService.findByIdAndUpdate(id,{
        $set:{title, description, price, thumbnail, code, stock, status}
      });

      if(!product){
        return res.status(404).json({error: "Producto no encontrado"});
      }
      res.json(product);
    }catch(error){
      res.status(500).json({error});
    }
  }

  //Se elimina el producto por ID
  async delete(req, res){
    try{
      const {id} = req.params;
      const product = await productService.findByIdAndDelete(id);

      if(!product){
        return res.status(404).json({error: "Producto no encontrado"});
      }
      res.json(product);
    }catch(error){
      res.status(500).json({error});
    }
  }
}

export default new productController();