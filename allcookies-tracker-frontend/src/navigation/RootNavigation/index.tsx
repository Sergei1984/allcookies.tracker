import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native-appearance";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SignInScreen } from "../../screens/SignInScreen";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import AppNavigation from "../AppNavigation";
import AuthNavigation from "../AuthNavigation";
import DrawerNavigation from "../DrawerNavigation";

const RootNavigation = () => {
  const schema = useColorScheme();
  const { isAuthorized } = useAppSelector((state) => state.userReducer);
  return (
    <NavigationContainer theme={schema === "dark" ? darkTheme : lightTheme}>
      {isAuthorized ? <DrawerNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
