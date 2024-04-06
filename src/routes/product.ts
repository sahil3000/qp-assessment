import { Router } from "express";
import { adminAccess, verifyJWT } from "../middleware/auth.middleware";
import { addGrocery, getAllGroceryItems, getAvailableItems, manageItemQuantity, removeItem, updateItem } from "../controllers/product.controller";

const router = Router();
// Admin Routes
router.post("/", verifyJWT, adminAccess, addGrocery);
router.get("/", verifyJWT, adminAccess, getAllGroceryItems);
router.delete("/:id", verifyJWT, adminAccess, removeItem);
router.put("/:id", verifyJWT, adminAccess, updateItem);
router.patch("updateQuantity/:id", verifyJWT, adminAccess, manageItemQuantity);

// User routes
router.get("/availableItems", verifyJWT, getAvailableItems);

export default router;
