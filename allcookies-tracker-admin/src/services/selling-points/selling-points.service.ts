import axiosInstance from "../../api";
import { ILogin } from "../../store/auth/types";

class SellingPointsService {
  public getSellingPoints = async (skip: number, take: number) => {
    return await axiosInstance.get(
      `/admin/selling-point/?skip=${skip}&take=${take}`,
      {}
    );
  };
  public addNewSellingPoints = async () => {
    return await axiosInstance.post("/admin/selling-point/create", {}, {});
  };
}

export default new SellingPointsService();
