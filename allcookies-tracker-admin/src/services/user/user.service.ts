import { TryOutlined } from "@mui/icons-material";
import axiosInstance from "../../api";
import { Users, User, UserWithId } from "../../api/endpoints";
import { IUser } from "../../store/users/types";

interface IUserService {
  getAllUsers: (skip: number, take: number, search?: string) => Promise<any>;
  createUser: (body: IUser) => Promise<any>;
}

class UserService implements IUserService {
  public getAllUsers = async (skip: number, take: number, search?: string) => {
    const response = await axiosInstance.get(Users(skip, take, search));
    return response.data;
  };
  public createUser = async (body: IUser) => {
    const response = await axiosInstance.post(User(), body);
    return response.data;
  };
  public deleteUser = async (id: number) => {
    return await axiosInstance.patch(UserWithId(id), {
      is_blocked: true
    });
  };
  public editUser = async (id: number, title: string) => {
    return await axiosInstance.patch(UserWithId(id), {
      name: title,
      is_blocked: false,
    });
  };
}

export const UserAPI = new UserService();
