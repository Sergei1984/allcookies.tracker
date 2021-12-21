import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { userSlice } from "../../store/user/slice";
import { getProfileThunk } from "../../store/user/thunk";
import createStyles from "./styles";

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clearCurrentUser } = userSlice.actions;
  const { user } = useAppSelector((state) => state.userReducer);
  const styles = React.useMemo(() => createStyles(), []);
  const { colors } = useTheme();

  React.useEffect(() => {
    dispatch(getProfileThunk());
  }, []);

  const handleLogOut = async () => {
    dispatch(clearCurrentUser());
    await AsyncStorageLib.removeItem("token");
  };

  return (
    <View style={styles.body}>
      <Text style={[styles.text, { color: colors.text }]}>Profile Screen</Text>
      <AppText>Email {user?.email}</AppText>
      <AppText>Name {user?.name}</AppText>
      <TouchableOpacity onPress={handleLogOut}>
        <AppText>Logout</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
