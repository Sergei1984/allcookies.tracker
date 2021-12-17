import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigation from "../../navigation/AppNavigation";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AuthNavigation from "../../navigation/AuthNavigation";

export const MainLayout: React.FC = () => {
  const [token, setToken] = React.useState<string | null>("");

  React.useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorageLib.getItem("token");
      setToken(token);
    };
    getToken();
  }, []);

  const currentNav = React.useMemo(() => {
    return token ? <AppNavigation /> : <AuthNavigation />;
  }, []);

  const schema = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={schema === "dark" ? darkTheme : lightTheme}>
        {currentNav}
      </NavigationContainer>
    </AppearanceProvider>
  );
};
