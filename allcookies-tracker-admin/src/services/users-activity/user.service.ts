import axiosInstance from "../../api";
import { UsersActivities } from "../../api/endpoints";

class UsersActivityService {
  public getUsersActivity = async (date: string) => {
    const response = await axiosInstance.get(UsersActivities(date));
    return response.data;
  };
}

export const UsersActivityAPI = new UsersActivityService();
