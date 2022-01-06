import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

const ProfileStack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
