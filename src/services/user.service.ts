import { User, UserDocument } from "../models/user.model";
import { UserType } from "../types";

export const userService = {
  create: async function (payload: UserType) {
    const newUser = await User.create(payload);
    const { password, ...newUserWithoutPassword } = newUser.toObject();
    return newUserWithoutPassword;
  },
  findUserByEmail: async function (email: string) {
    return User.findOne({ email });
  },
  findById: async function (id: string) {
    return User.findById(id).select("-password");
  }
};
