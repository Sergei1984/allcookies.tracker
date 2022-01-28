import axiosInstance from "../../api";
import { ILogin } from "../../store/auth/types";

class SellingPointsService {
  public getSellingPoints = async (
    skip: number,
    take: number,
    search?: string
  ) => {
    return await axiosInstance.get(
      `/admin/selling-point/?skip=${skip}&take=${take}&title=${
        search ? search : ""
      }`,
      {}
    );
  };
  public addNewSellingPoint = async (payload: any) => {
    return await axiosInstance.post("/admin/selling-point/", payload, {});
  };
}

export default new SellingPointsService();
