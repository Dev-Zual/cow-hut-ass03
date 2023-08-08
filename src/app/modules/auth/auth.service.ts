import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const res = await User.create(userData);
  return res;
};

export const AuthService = {
  createUser,
};
