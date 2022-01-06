import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import ListOfProducts from "../../screens/ListOfProducts/ListOfProducts";

export type HomeStackParamList = {
  HomeScreen: undefined;
  ListOfProducts: { title: string };
};

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Главная" component={HomeScreen} />
      <HomeStack.Screen
        options={({ route }: any) => ({
          title: `Список товаров в ${route.params?.title as string}`,
        })}
        name="Список товаров"
        component={ListOfProducts}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
