import axiosInstance from "../shared/utils/axiosInstanceHelper";

class UserService {
    public getProfile = async () => {
        const response = await axiosInstance.get('profile/me');
        return response.data;
    }
}

export const UserAPI = new UserService();