import { Router } from "express";
import productRoutes from "../routes/products.routes.js";

const router = Router();

router.use("/products", productRoutes);

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
