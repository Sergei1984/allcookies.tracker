import axiosInstance from "../../api";
import {IUser} from "../../store/addUsers/types";


class UserService {
	public getAllUsers = async () => {
		return await axiosInstance.get('/admin/user-accounts')
	};

	public createUser = async (body: IUser) => {
		return await axiosInstance.post('/admin/user-accounts',body)
	};
}

export const UserAPI = new UserService()