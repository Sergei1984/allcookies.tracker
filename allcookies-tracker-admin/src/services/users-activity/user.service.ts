import axiosInstance from "../../api";
import { UsersActivity } from "../../api/endpoints";

class UsersActivityService {
  public getUsersActivity = async (date: string) => {
    const response = await axiosInstance.get(UsersActivity(date));
    return response.data;
  };
}

export const UsersActivityAPI = new UsersActivityService();
