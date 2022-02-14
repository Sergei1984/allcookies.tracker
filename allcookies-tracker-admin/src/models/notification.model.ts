import { VariantEnums } from "../core/enums";

export interface NotificationModel {
  key: any;
  message: MessageModel;
  options: any;
  dismissed: boolean;
}

export interface MessageModel {
  type: VariantEnums;
  title: string;
  message: string;
}
