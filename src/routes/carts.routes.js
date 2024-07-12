import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", cartController.createCart);
router.get("/:id", cartController.getCart);
router.post("/:id/product/:productId", cartController.addProductToCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:id", cartController.updateCart);

export default router;
