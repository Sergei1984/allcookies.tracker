import React from "react";
import { Provider } from "react-redux";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { setupStore } from "./store/store";
import SplashScreen from "react-native-splash-screen";
import { Platform, StatusBar } from "react-native";
import { useColorScheme } from "react-native-appearance";

export default function App() {
  const store = setupStore();
  const schema = useColorScheme();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {Platform.OS === "ios" && schema !== "dark" ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}
      <MainLayout />
    </Provider>
  );
}
