import { ProfileModel, GET_PROFILE } from "./types";

export const getProfileAction = (paylaod: ProfileModel): any => ({
  type: GET_PROFILE,
  payload: paylaod,
});
