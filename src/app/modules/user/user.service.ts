import { IUser } from "./user.interface";
import User from "./user.model";

// get all users
const getAllUsers = async (): Promise<IUser[] | null> => {
  const res = await User.find();
  return res;
};

// get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const res = await User.findOne({ _id: id });
  return res;
};

// update a single user
const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData } = data;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey as keyof Partial<IUser>] =
        name[key as keyof typeof name];
    });
  }

  const res = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return res;
};

// delete a user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const res = await User.findOneAndDelete({ _id: id });
  return res;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
