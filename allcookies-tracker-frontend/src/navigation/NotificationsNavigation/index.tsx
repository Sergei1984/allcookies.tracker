import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationsScreen from "../../screens/NotificationsScreen/NotificationsScreen";

export type NotificationsStackParamList = {
  NotificationsScreen: undefined;
};

const NotificationsStack = createNativeStackNavigator();

const NotificationsNavigation = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="Уведомления"
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
};

export default NotificationsNavigation;
