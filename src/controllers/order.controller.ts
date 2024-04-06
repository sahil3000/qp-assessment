import { Request, Response } from "express";
import { validateBookOrderData } from "../utils/validatation";
import { CusomUserIdRequest } from "../middleware/auth.middleware";
import { orderService } from "../services/order.service";

export const OrderGloceryItems = async  (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const valid = validateBookOrderData(payload);
    if (valid.error) {
      return res.status(400).json({
        message: valid.error.message,
        error: true,
        data: {},
      });
    }

    const userId = (req as CusomUserIdRequest).userId;
    const order = await orderService.book(userId, payload);

    return res.status(201).json({
      message: "Order booked successfully",
      error: false,
      data: order
    });
  } catch (error) {
    let message = "Something went wrong";
    if (error instanceof Error) message = error.message;

    return res.status(500).json({
      data: {},
      error: true,
      message,
    });
  }
};
