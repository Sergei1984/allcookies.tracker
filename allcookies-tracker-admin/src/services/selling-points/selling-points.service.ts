import axiosInstance from "../../api";
import {
  SellingPoints,
  SellingPointWithId,
  SellingPoint,
} from "../../api/endpoints";

import { EditSellingPointParams } from "../../store/selling-points/types";

interface ISellingPointsService {
  getSellingPoints: (
    skip: number,
    take: number,
    search?: string
  ) => Promise<any>;
  deleteSellingPoint: (id: number) => Promise<any>;
  addNewSellingPoint: (payload: any) => Promise<any>;
  editSellingPoint: (
    id: number,
    values: EditSellingPointParams
  ) => Promise<any>;
}

class SellingPointsService implements ISellingPointsService {
  public getSellingPoints = async (
    skip: number,
    take: number,
    search?: string
  ) => {
    return await axiosInstance.get(SellingPoints(skip, take, search), {});
  };
  public deleteSellingPoint = async (id: number) => {
    return await axiosInstance.delete(SellingPointWithId(id));
  };
  public addNewSellingPoint = async (payload: any) => {
    return await axiosInstance.post(SellingPoint(), payload, {});
  };
  public editSellingPoint = async (
    id: number,
    values: EditSellingPointParams
  ) => {
    return await axiosInstance.patch(SellingPointWithId(id), {
      ...values,
      is_disabled: false,
    });
  };
}

export default new SellingPointsService();
