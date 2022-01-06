import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../../screens/MapScreen";

export type MapStackParamList = {
  MapScreen: undefined;
};

const MapStack = createNativeStackNavigator();

const MapNavigation = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="MapScreen" component={MapScreen} />
    </MapStack.Navigator>
  );
};

export default MapNavigation;
