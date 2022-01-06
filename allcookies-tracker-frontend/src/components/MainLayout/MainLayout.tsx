import React from "react";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "../../navigation/AuthNavigation";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import { useAppSelector } from "../../hooks/useAppSelector";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { userSlice } from "../../store/user/slice";
import { getProfileThunk } from "../../store/user/thunk";
import AppNavigation from "../../navigation/AppNavigation";
// import Geocoder from "react-native-geocoding";

export const MainLayout: React.FC = () => {
  // useCurrentUser();
  const schema = useColorScheme();
  const dispatch = useAppDispatch();
  const { setIsAuthorized } = userSlice.actions;
  const { isAuthorized, user } = useAppSelector((state) => state.userReducer);

  const getTokenFromStorage = React.useCallback(async () => {
    const token = await AsyncStorageLib.getItem("token");
    return token;
  }, []);

  React.useEffect(() => {
    const checkUser = async () => {
      const token = await getTokenFromStorage();
      if (token) {
        await dispatch(getProfileThunk());
      }
    };
    checkUser();
  }, [dispatch]);

  const currentNav = React.useMemo(() => {
    if (isAuthorized || user) {
      return <AppNavigation />;
    }
    return <AuthNavigation />;
  }, [isAuthorized, user]);

  // Geocoder.init("AIzaSyDLPT4U7sCzUNNtaV2XL0Z8rXq2IFFof74");

  return (
    <AppearanceProvider>
      <NavigationContainer theme={schema === "dark" ? darkTheme : lightTheme}>
        {currentNav}
      </NavigationContainer>
    </AppearanceProvider>
  );
};
