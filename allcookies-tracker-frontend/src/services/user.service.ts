import axiosInstance from "../shared/utils/axiosInstanceHelper";
import { IOpenCloseDay } from "../store/user/types";

class UserService {
    public getProfile = async () => {
        const response = await axiosInstance.get('profile/me');
        return response.data;
    }

    public getActivity = async () => {
        const response = await axiosInstance.get('client/activity');
        return response.data
    }

    public uploadPhoto = async (id: number, photo: any) => {
        const response = await axiosInstance.post(`client/activity/${id}/photo`);
        return response.data;
    }

    public openDay = async (data: IOpenCloseDay) => {
        const response = await axiosInstance.post('client/activity/open-day', data);
        return response.data;
    }

    public closeDay = async (data: IOpenCloseDay) => {
        const response = await axiosInstance.post('client/activity/close-day', data);
        return response.data;
    }
}

export const UserAPI = new UserService();