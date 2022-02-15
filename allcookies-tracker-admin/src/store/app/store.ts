import { StatusEnum } from "../../core/enums";
import { NotificationModel } from "../../models/notification.model";

export const initialState = {
  status: StatusEnum.initial,
  error: null,
  notifications: [] as NotificationModel[],
};
