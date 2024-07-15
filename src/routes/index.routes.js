import express from "express";
import { Router } from "express";
import productRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import viewRoutes from "./views.routes.js";

const router = Router();

//Routes
router.use("/products", productRoutes);
router.use("/carts", cartsRoutes);
router.use("/view", viewRoutes);

export default router;
