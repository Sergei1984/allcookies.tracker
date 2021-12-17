import React from "react";
import { Provider } from "react-redux";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { setupStore } from "./store/store";
import SplashScreen from "react-native-splash-screen";
import { Platform, StatusBar } from "react-native";

export default function App() {
  const store = setupStore();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <MainLayout />
    </Provider>
  );
}
