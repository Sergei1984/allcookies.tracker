import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import { MapScreen } from "../../screens/MapScreen";

export type MainStackParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
};

const MainStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Map" component={MapScreen} />
    </MainStack.Navigator>
  );
};

export default AppNavigation;
