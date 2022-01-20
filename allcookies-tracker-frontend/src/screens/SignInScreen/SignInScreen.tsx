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
  Image,
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
import images from "../../constants/images";
import { userSlice } from "../../store/user/slice";

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

  const { clearError } = userSlice.actions;
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
            <View style={styles.logoWrapper}>
              <Image source={images.LOGO} />
            </View>
            <AppText style={styles.title} color="#262C30">
              Добро пожаловать в Allcookies
            </AppText>
            <AppText style={styles.preTitle} color="#9098B1">
              Войдите чтобы продолжить
            </AppText>
            <AppTextInput
              value={formData.login}
              onChangeText={(value: string) => {
                handleChange(value, "login");
                if (error) {
                  console.log("error");
                  dispatch(clearError());
                }
              }}
              placeholder="Логин"
              autoCapitalize="none"
              style={styles.input}
            />
            <AppTextInput
              value={formData.password}
              onChangeText={(value: string) => {
                handleChange(value, "password");
                if (error) {
                  console.log("error");
                  dispatch(clearError());
                }
              }}
              placeholder="Пароль"
              autoCapitalize="none"
              secureTextEntry
              style={[styles.input]}
            />
            {error ? (
              <AppText style={{ textAlign: "center" }} color={Colors.RED}>
                {error}
              </AppText>
            ) : null}
            <View style={{ marginTop: 57 }}>
              <AppButton
                onPress={handleSignIn}
                name="Войти"
                disabled={isLoading || !nextDisabled}
              />
            </View>
          </View>
        </View>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
