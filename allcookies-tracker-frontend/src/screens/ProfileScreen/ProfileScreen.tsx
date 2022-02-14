import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { userSlice } from "../../store/user/slice";
import { getProfileThunk } from "../../store/user/thunk";
import createStyles from "./styles";
import { AppTextInput } from "../../components/AppTextInput";

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
      <View>
        <View>
          <AppText style={styles.label} color="#262C30">
            Имя
          </AppText>
          <AppTextInput
            value={user?.name}
            editable={false}
            style={styles.input}
          />
        </View>
        <View>
          <AppText style={styles.label} color="#262C30">
            E-mail
          </AppText>
          <AppTextInput
            value={user?.email}
            editable={false}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
        <AppText style={styles.logOutTitle} color="#fff">
          Выйти
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
