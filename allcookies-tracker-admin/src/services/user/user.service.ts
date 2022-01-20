import axiosInstance from "../../api";


class UserService {
	public getAllUsers = async () => {
		return await axiosInstance.get('/admin/user-accounts')
	};
}

export const UserAPI = new UserService()