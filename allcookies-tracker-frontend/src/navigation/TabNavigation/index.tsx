import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigation from "../AppNavigation";
import { ListOfPointsScreen } from "../../screens/ListOfPointsScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import { View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home": {
              return (
                <View>
                  <MaterialIcons name={"home"} size={30} color={color} />
                </View>
              );
            }
            case "PointsList": {
              return (
                <View>
                  <MaterialIcons
                    name={"control-point"}
                    size={30}
                    color={color}
                  />
                </View>
              );
            }
            case "Profile": {
              return (
                <View>
                  <MaterialIcons name={"account-box"} size={30} color={color} />
                </View>
              );
            }
          }
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={AppNavigation} />
      <Tab.Screen name="PointsList" component={ListOfPointsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
