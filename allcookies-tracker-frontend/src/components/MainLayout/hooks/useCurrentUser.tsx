import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { userSlice } from "../../../store/user/slice";
import { getProfileThunk } from "../../../store/user/thunk";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { setIsAuthorized } = userSlice.actions;
  const { isAuthorized } = useAppSelector((state) => state.userReducer);

  const getTokenFromStorage = React.useCallback(async () => {
    const token = await AsyncStorageLib.getItem("token");
    if (token) {
      dispatch(setIsAuthorized());
    }
  }, []);

  React.useEffect(() => {
    const checkUser = async () => {
      await getTokenFromStorage();
      if (isAuthorized) {
        await dispatch(getProfileThunk());
        return;
      }
    };
    checkUser();
  }, []);
};
