import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { InitialScreen } from "../../screens/InitialScreen";
import { SignInScreen } from "../../screens/SignInScreen";

export type MainStackParamList = {
  InitialScreen: undefined;
};
const MainStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="SignIn" component={SignInScreen} />
    </MainStack.Navigator>
  );
};

export default AppNavigation;
