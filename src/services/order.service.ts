import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { BookOrderPayload } from "../types";


export const orderService = {
  book: async (userId: string, payload: BookOrderPayload) => {
    // Start a Mongoose session for transaction support
    const session = await Order.startSession();
    session.startTransaction();

    // Update product quantities
    for (const item of payload.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      if (product.quantityAvailable < item.quantity) {
        throw new Error(
          `Insufficient quantity available for product ${product.name}`
        );
      }
      product.quantityAvailable -= item.quantity;
      await product.save();
    }

    // Create order record
    const order = new Order({
      items: payload.items,
      totalPrice: payload.totalPrice,
      status: payload.status,
      userId,
    });
    await order.save();

    // Commit the transaction
    await session.commitTransaction();
    return order;
  },
};
