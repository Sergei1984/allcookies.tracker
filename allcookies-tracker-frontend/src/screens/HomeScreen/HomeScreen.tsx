import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import createStyles from "./styles";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const styles = React.useMemo(() => createStyles(), []);
  const { colors } = useTheme();
  return (
    <View style={styles.body}>
      <Text style={[styles.text, { color: colors.text }]}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
