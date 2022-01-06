import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomeNavigation from "../HomeNavigation";
import MapNavigation from "../MapNavigation";
import ProfileNavigation from "../ProfileNavigation";

export type MainStackParamList = {};

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Главная": {
              return (
                <View>
                  <MaterialIcons name={"home"} size={30} color={color} />
                </View>
              );
            }
            case "Уведомления": {
              return (
                <View>
                  <MaterialIcons
                    name={"notifications"}
                    size={30}
                    color={color}
                  />
                </View>
              );
            }
            case "Карты": {
              return (
                <View>
                  <MaterialIcons name={"map"} size={30} color={color} />
                </View>
              );
            }
            case "Профиль": {
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
      <Tab.Screen name="Главная" component={HomeNavigation} />
      <Tab.Screen name="Уведомления" component={HomeNavigation} />
      <Tab.Screen name="Карты" component={MapNavigation} />
      <Tab.Screen name="Профиль" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
