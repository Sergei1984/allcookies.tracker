import axiosInstance from "../../api";
import {IUser} from "../../store/users/types";


class UserService {
	public getAllUsers = async () => {
		const response = await axiosInstance.get('/admin/user-accounts');
		return response.data;
	};

 	public createUser = async (body: IUser) => {
 		return await axiosInstance.post('/admin/user-accounts', body)
 	};
 }


export const UserAPI = new UserService()