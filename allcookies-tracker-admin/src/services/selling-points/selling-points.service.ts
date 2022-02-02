import axiosInstance from "../../api";

import { EditSellingPointParams } from "../../store/selling-points/types";

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
  public deleteSellingPoint = async (id: number) => {
    return await axiosInstance.delete(`/admin/selling-point/${id}`);
  };

  public addNewSellingPoint = async (payload: any) => {
    return await axiosInstance.post("/admin/selling-point/", payload, {});
  };

  public editSellingPoint = async (
    id: number,
    values: EditSellingPointParams
  ) => {
    return await axiosInstance.patch(`/admin/selling-point/${id}`, {
      ...values,
      is_disabled: false,
    });
  };
}

export default new SellingPointsService();
