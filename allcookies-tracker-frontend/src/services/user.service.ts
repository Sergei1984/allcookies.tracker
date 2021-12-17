import axiosInstance from "../shared/utils/axiosInstanceHelper";

class UserService {
    public getProfile = async () => {
        const response = await axiosInstance.get('https://allcookies-tracker.a-dev.com/profile/me');
        return response.data;
    }
}

export const UserAPI = new UserService();