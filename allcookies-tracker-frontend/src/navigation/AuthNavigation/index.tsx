import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SignInScreen } from "../../screens/SignInScreen";

export type MainStackParamList = {
  SignInScreen: undefined;
};
const MainStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="SignIn" component={SignInScreen} />
    </MainStack.Navigator>
  );
};

export default AuthNavigation;
