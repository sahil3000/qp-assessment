import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { validateLoginData, validateSignUpData } from "../utils/validatation";

export const signup = async (req: Request, res: Response) => {
  const payload = req.body;

  const valid = validateSignUpData(payload);

  if (valid.error) {
    return res.status(400).json({
      data: {},
      error: true,
      message: valid.error.message,
    });
  }

  try {
    const user = await userService.findUserByEmail(payload.email);

    if (user) {
      return res.status(403).json({
        data: {},
        error: true,
        message: "User already exist",
      });
    }

    const response = await userService.create(payload);
    res.status(201).json({
      data: response,
      error: false,
      message: "User signed up successfully",
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      error: true,
      message: "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const body = req.body;
  // validation
  const valid = validateLoginData(body);

  if (valid.error) {
    return res.status(400).json({
      data: {},
      error: true,
      message: valid.error.message,
    });
  }

  const user = await userService.findUserByEmail(body.email);
  console.log("user", user)
  if (!user) {
    return res.status(403).json({
      data: {},
      error: true,
      message: "Email or password is wrong",
    });
  }

  const isPasswordCorrect = await user.isPasswordCorrect(body.password);

  if (!isPasswordCorrect) {
    return res.status(403).json({
      data: {},
      error: true,
      message: "Email or password is wrong",
    });
  }

  const token = await user.generateToken();
  res.status(200).json({
    data: { token, email: user.email, name: user.fullName },
    error: false,
    message: "Login successful",
  });
};
