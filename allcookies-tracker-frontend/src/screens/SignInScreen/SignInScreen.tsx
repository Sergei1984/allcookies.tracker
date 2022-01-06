import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  AppState,
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
import TouchID from "react-native-touch-id";
import { signInThunk } from "../../store/user/thunk";
import createStyles from "./styles";
import * as Keychain from "react-native-keychain";

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
  const [isBiometry, setIsBiometry] = React.useState(false);
  const { user, isLoading, error, isLogout, isAuthorized } = useAppSelector(
    (state) => state.userReducer
  );

  const { formData, handleChange } = useForm<TData>({
    login: "",
    password: "",
  });

  // const optionalConfigObject = {
  //   unifiedErrors: false, // use unified error messages (default false)
  //   passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
  // };

  // React.useEffect(() => {
  //   (async () => {
  //     const biometryType = await TouchID.isSupported(optionalConfigObject);
  //     setIsBiometry(!!biometryType);
  //   })();
  // }, []);

  //const appState = React.useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = React.useState(
  //   appState.current
  // );

  // React.useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       console.log("App has come to the foreground!");
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log("AppState", appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  const nextDisabled = React.useMemo(() => {
    return formData.login !== "" && formData.password !== "";
  }, [formData]);

  const handleSignIn = React.useCallback(async () => {
    dispatch(
      signInThunk({
        login: formData.login,
        password: formData.password,
      })
    );
    // if (isBiometry) {
    //   await Keychain.setGenericPassword(formData.login, formData.password);
    //   await TouchID.authenticate("Login to this app", optionalConfigObject);
    // }
  }, [formData]);

  // React.useEffect(() => {
  //   if (!isLogout) {
  //     handleBiometry();
  //   }
  // }, [isLogout]);

  // const handleBiometry = React.useCallback(async () => {
  //   let authRes = await TouchID.authenticate("sign in", optionalConfigObject);
  //   let credentials = await Keychain.getGenericPassword();
  //   if (authRes && credentials) {
  //     dispatch(
  //       signInThunk({
  //         login: credentials.username,
  //         password: credentials.password,
  //       })
  //     );
  //   }
  // }, []);

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
            <AppText style={styles.title}>Войдите чтобы продолжить</AppText>
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
              secureTextEntry
              style={[styles.input, { marginBottom: 57 }]}
            />
            {error ? (
              <AppText style={{ textAlign: "center" }} color={Colors.RED}>
                {error}
              </AppText>
            ) : null}
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
