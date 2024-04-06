import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            requied: true
        }
    }],
    totalPrice: {
        type: Number,
        requied: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        required: true
    },
}, { timestamps: true });

export const Order = model("Order", orderSchema);
