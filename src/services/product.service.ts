import { Product } from "../models/product.model";
import { ProductPayload } from "../types";

export const productService = {
  add: async (payload: ProductPayload) => {
    return await Product.create(payload);
  },
  getAllItems: async () => {
    return Product.find({});
  },
  getAvailableItem: async () => {
    return Product.find({
      quantityAvailable: {
        $gt: 0,
      },
    });
  },
  removeItem: async (id: string) => {
    return Product.findByIdAndDelete(id);
  },
  updateItem: async (id: string, body: ProductPayload) => {
    return Product.findByIdAndUpdate(id, body, { new: true });
  },
  updateItemQuantity: async (id: string, quantity: number) => {
    return Product.findByIdAndUpdate(
      id,
      { quantityAvailable: quantity },
      { new: true }
    );
  },
};
