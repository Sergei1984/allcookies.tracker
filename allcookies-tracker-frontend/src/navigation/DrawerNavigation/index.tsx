import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerProgress,
} from "@react-navigation/drawer";
import TabNavigation from "../TabNavigation";
import { ListOfPointsScreen } from "../../screens/ListOfPointsScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Home" component={TabNavigation} />
      <Drawer.Screen name="PointsList" component={ListOfPointsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
