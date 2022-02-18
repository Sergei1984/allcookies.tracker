import axiosInstance from '../../api';
import { Users, User, UserInfo } from '../../api/endpoints';
import { IUser } from '../../store/users/types';

interface IUserService {
  getAllUsers: (skip: number, take: number, search?: string) => Promise<any>;
  createUser: (body: IUser) => Promise<any>;
}

class UserService implements IUserService {
  public getAllUsers = async (skip: number, take: number, search?: string) => {
    const response = await axiosInstance.get(Users(skip, take, search));
    return response.data;
  };
  public getUser = async (id: number | string) => {
    const response = await axiosInstance.get(UserInfo(id));
    return response.data;
  };
  public createUser = async (body: IUser) => {
    const response = await axiosInstance.post(User(), body);
    return response.data;
  };
}

export const UserAPI = new UserService();
