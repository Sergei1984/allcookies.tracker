import { GET_PROFILE, ProfileState } from "./types";
import { ActionType } from "../../core/types";
import { initialState } from "./store";

const profileReducer = (
  state: ProfileState = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};

export default profileReducer;
