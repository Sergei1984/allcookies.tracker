import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { useCurrentUser } from "./hooks/useCurrentUser";
import RootNavigation from "../../navigation/RootNavigation";

export const MainLayout: React.FC = () => {
  useCurrentUser();
  return (
    <AppearanceProvider>
      <RootNavigation />
    </AppearanceProvider>
  );
};
