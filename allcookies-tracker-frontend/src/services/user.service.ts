import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosInstance from "../shared/utils/axiosInstanceHelper";
import { IOpenCloseDay } from "../store/user/types";

class UserService {
    public getProfile = async () => {
        const response = await axiosInstance.get('profile/me');
        return response.data;
    }

    public getActivity = async () => {
        const response = await axiosInstance.get('client/activity');
        console.log(response.data)
        return response.data
    }

    public getActivityStatus = async () => {
        const response = await axiosInstance.get('client/activity/status');
        return response.data
    }

    public uploadPhoto = async (id: number, data: any) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': await AsyncStorageLib.getItem('token') as string
          }
          console.log(id, data)
        // const response = await axiosInstance.post(`client/activity/${id}/photo`, data);
        const response = await axios.post(`https://allcookies-tracker.a-dev.com/client/activity/${id}/photo`, data, {
            headers: headers
          })
          console.log(response)
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