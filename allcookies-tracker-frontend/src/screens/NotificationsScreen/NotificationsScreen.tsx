import React from "react";
import { View } from "react-native";
import { AppText } from "../../components/AppText";
import createStyles from "./styles";

const NotificationsScreen: React.FC = () => {
  const styles = React.useMemo(() => createStyles(), []);

  return (
    <View style={styles.container}>
      <AppText>Notifications Screen</AppText>
    </View>
  );
};

export default NotificationsScreen;
