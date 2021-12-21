import React from "react";
import { View } from "react-native";
import createStyles from "./styles";

export const MapScreen: React.FC = () => {
  const styles = React.useMemo(() => createStyles(), []);

  return <View style={styles.body}></View>;
};
