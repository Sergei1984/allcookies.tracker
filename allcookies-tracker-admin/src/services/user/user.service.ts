import axiosInstance from "../../api";
import { IUser } from "../../store/users/types";

class UserService {
  public getAllUsers = async (skip: number, take: number) => {
    const response = await axiosInstance.get(
      `/admin/user-accounts/?skip=${skip}&take=${take}`
    );
    return response.data;
  };

  public createUser = async (body: IUser) => {
    const response = await axiosInstance.post("/admin/user-accounts", body);
    return response.data;
  };
}

export const UserAPI = new UserService();
