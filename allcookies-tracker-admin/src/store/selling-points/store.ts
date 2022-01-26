import { StatusEnum } from "../../core/enums";
import { SellingPointModel } from "../../models/selling-point.model";

export const initialState = {
  status: StatusEnum.initial,
  data: [] as SellingPointModel[],
  total: 1,
  page: 1,
  limit: 5,
  error: null,
};