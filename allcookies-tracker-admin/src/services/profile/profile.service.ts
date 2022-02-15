import axiosInstance from "../../api";
import { Profile } from "../../api/endpoints";

interface IProfileService {
  getProfile: () => Promise<any>;
}

class ProfileService implements IProfileService {
  public getProfile = async () => {
    return await axiosInstance.get(Profile(), {});
  };
}

export default new ProfileService();
