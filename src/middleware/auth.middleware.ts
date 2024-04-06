import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userService } from "../services/user.service";


export interface CustomRequest extends Request {
  user: {
    username: string;
    email: string;
    password: string;
    fullName: string;
    contactNo: string;
    role: "Admin" | "User";
  };
 }

 export interface CusomUserIdRequest extends Request {
  userId: string;
 }

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        data: {},
        message: "Unauthorized request",
        error: true,
      });
    }

    const decodedToken = jwt.verify(token, "secret") as JwtPayload;
    const user = await userService.findById(decodedToken?.id);
    
    if (!user) {
      return res.status(401).json({
        data: {},
        message: "Invalid token",
        error: true,
      });
    }

    (req as CustomRequest).user = user;
    (req as CusomUserIdRequest).userId = decodedToken?.id;
    next();
  } catch (error) {
    let message = "Invalid access token";
    if (error instanceof Error) {
      message = error.message;
    }
    return res.status(401).json({
      data: {},
      message,
      error: true,
    });
  }
};

export const adminAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as CustomRequest)?.user?.role === "Admin") {
    next();
    return;
  }
  return res.status(403).json({
    data: {},
    message: "Permission denied",
    error: true,
  });
};
