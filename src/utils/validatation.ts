import Joi, { Schema } from "joi";
import {
  BookOrderPayload,
  LoginPayload,
  ProductPayload,
  ProductQuantityUpdatePayload,
  UserType,
} from "../types";

export const validateSignUpData = (body: UserType) => {
  const signupSchema: Schema = Joi.object({
    fullName: Joi.string().required().min(2),
    password: Joi.string().required().min(6).max(30),
    username: Joi.string().required().min(3).max(15),
    email: Joi.string().required().email(),
    contactNo: Joi.string().required(),
    role: Joi.string().valid("User", "Admin"),
  });

  return signupSchema.validate(body);
};

export const validateLoginData = (body: LoginPayload) => {
  const loginSchema: Schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return loginSchema.validate(body);
};

export const validationAddProductData = (body: ProductPayload) => {
  const addProductSchema: Schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ "any.required": "name is mandatory field" }),
    description: Joi.string()
      .required()
      .messages({ "any.required": "description is mandatory field" }),
    price: Joi.number()
      .required()
      .messages({ "any.required": "price is mandatory field" }),
    quantityAvailable: Joi.number()
      .required()
      .messages({ "any.required": "quantityAvailable is mandatory field" }),
  });

  return addProductSchema.validate(body);
};

export const validationUpdateProductQuantity = (
  body: ProductQuantityUpdatePayload
) => {
  const updateAvailableQuantity = Joi.object({
    quantityAvailable: Joi.number()
      .required()
      .messages({ "any.required": "quantityAvailable is mandatory field" }),
  });

  return updateAvailableQuantity.validate(body);
};

const itemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export const validateBookOrderData = (payload: BookOrderPayload) => {
  const bookOrder: Schema = Joi.object({
    items: Joi.array().items(itemSchema).min(1).required(), // Array of items, at least one required
    totalPrice: Joi.number().required(),
    status: Joi.string().valid("pending", "completed", "cancelled").required(),
  });

  return bookOrder.validate(payload);
};
