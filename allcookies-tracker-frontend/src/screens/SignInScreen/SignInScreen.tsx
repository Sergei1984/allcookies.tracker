import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppText } from "../../components/AppText";
import { AppTextInput } from "../../components/AppTextInput";
import { DismissKeyboardView } from "../../components/DismissKeyboardView";
import { Colors } from "../../constants/colors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useForm } from "../../hooks/useForm";
import { navigate } from "../../navigation/utils/navigationHelper";
import { signInThunk } from "../../store/user/thunk";
import createStyles from "./styles";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

interface TData {
  login: string;
  password: string;
}

export const SignInScreen: React.FC<IProps> = ({ navigation }) => {
  const styles = React.useMemo(() => createStyles(), []);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );

  const { formData, handleChange } = useForm<TData>({
    login: "",
    password: "",
  });

  const nextDisabled = React.useMemo(() => {
    return formData.login !== "" && formData.password !== "";
  }, [formData]);

  const handleSignIn = React.useCallback(() => {
    dispatch(
      signInThunk({
        login: formData.login,
        password: formData.password,
      })
    );
  }, [formData]);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={styles.container}
    >
      <DismissKeyboardView>
        <View
          style={
            Platform.OS === "ios"
              ? { flex: 1, justifyContent: "space-around" }
              : { flex: 1, justifyContent: "flex-end" }
          }
        >
          <View style={styles.mainContent}>
            <AppTextInput
              value={formData.login}
              onChangeText={(value: string) => handleChange(value, "login")}
              placeholder="Логин"
              autoCapitalize="none"
              style={styles.input}
            />
            <AppTextInput
              value={formData.password}
              onChangeText={(value: string) => handleChange(value, "password")}
              placeholder="Пароль"
              autoCapitalize="none"
              style={styles.input}
            />
            {error ? (
              <AppText style={{ textAlign: "center" }} color={Colors.RED}>
                {error}
              </AppText>
            ) : null}
          </View>
          <View style={styles.footer}>
            <AppButton
              onPress={handleSignIn}
              name="Логин"
              disabled={isLoading || !nextDisabled}
            />
          </View>
        </View>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
