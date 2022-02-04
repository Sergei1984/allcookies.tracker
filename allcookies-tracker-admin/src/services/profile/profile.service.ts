import axiosInstance from "../../api";

import { EditSellingPointParams } from "../../store/selling-points/types";

class ProfileService {
  public getProfile = async () => {
    return await axiosInstance.get(`/profile/me`, {});
  };
  public updatePassword = async (id: string | number, password: string) => {
    return await axiosInstance.patch(`/admin/selling-point/${id}`, {
      password: password,
      is_disabled: false,
    });
  };
  public updateEmail = async (id: string | number, email: string) => {
    return await axiosInstance.patch(`/admin/selling-point/${id}`, {
      email: email,
      is_disabled: false,
    });
  };
}

export default new ProfileService();
