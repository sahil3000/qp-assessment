import { Router } from "express";
import { OrderGloceryItems } from "../controllers/order.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

// Users Routes
router.post('/', verifyJWT, OrderGloceryItems);

export default router;
