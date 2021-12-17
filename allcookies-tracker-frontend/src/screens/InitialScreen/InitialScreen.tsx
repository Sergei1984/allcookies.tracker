import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getProfileThunk } from "../../store/user/thunk";
import createStyles from "./styles";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
export const InitialScreen: React.FC<IProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  const styles = React.useMemo(() => createStyles(), []);
  const { colors } = useTheme();

  React.useEffect(() => {
    dispatch(getProfileThunk());
  }, []);

  console.log("user", user);
  return (
    <View style={styles.body}>
      <Text style={[styles.text, { color: colors.text }]}>Initial Screen</Text>
    </View>
  );
};
