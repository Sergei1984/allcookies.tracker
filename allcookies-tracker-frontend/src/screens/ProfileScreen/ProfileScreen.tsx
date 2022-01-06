import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  DeviceEventEmitter,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { AppText } from "../../components/AppText";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { userSlice } from "../../store/user/slice";
import { getProfileThunk } from "../../store/user/thunk";
import createStyles from "./styles";

type ButtonProps = {
  onPress: () => void | Promise<void>;
  label: string;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  onPress,
  label,
}: any) => {
  return (
    /** $FlowFixMe */
    <Pressable onPress={onPress}>
      <Text style={{ color: "red" }}>{label}</Text>
    </Pressable>
  );
};

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
  const [permissions, setPermissions] = React.useState({});

  React.useEffect(() => {
    // PushNotificationIOS.addEventListener("register", onRegistered);
    // PushNotificationIOS.addEventListener(
    //   "registrationError",
    //   onRegistrationError
    // );
    // PushNotificationIOS.addEventListener("notification", onRemoteNotification);
    // PushNotificationIOS.addEventListener(
    //   "localNotification",
    //   onLocalNotification
    // );

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
      sound: true,
      critical: true,
    }).then(
      (data) => {
        console.log("PushNotificationIOS.requestPermissions", data);
      },
      (data) => {
        console.log("PushNotificationIOS.requestPermissions failed", data);
      }
    );

    return () => {
      PushNotificationIOS.removeEventListener("register");
      PushNotificationIOS.removeEventListener("registrationError");
      PushNotificationIOS.removeEventListener("notification");
      PushNotificationIOS.removeEventListener("localNotification");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const sendLocalNotification = () => {
  //   PushNotificationIOS.presentLocalNotification({
  //     alertTitle: "Sample Title",
  //     alertBody: "Sample local notification",
  //     applicationIconBadgeNumber: 1,
  //   });
  // };

  const sendLocalNotificationWithSound = () => {
    PushNotificationIOS.addNotificationRequest({
      id: "notificationWithSound",
      title: "Sample Title",
      subtitle: "Sample Subtitle",
      body: "Sample local notification with custom sound",
      sound: "customSound.wav",
      badge: 12,
    });
  };

  // const onRegistered = (deviceToken: any) => {
  //   Alert.alert("Registered For Remote Push", `Device Token: ${deviceToken}`, [
  //     {
  //       text: "Dismiss",
  //       onPress: () => {},
  //     },
  //   ]);
  // };

  // const onRegistrationError = (error: any) => {
  //   Alert.alert(
  //     "Failed To Register For Remote Push",
  //     `Error (${error.code}): ${error.message}`,
  //     [
  //       {
  //         text: "Dismiss",
  //         onPress: () => {},
  //       },
  //     ]
  //   );
  // };

  // const onRemoteNotification = (notification: any) => {
  //   const isClicked = notification.getData().userInteraction === 1;

  //   const result = `
  //     Title:  ${notification.getTitle()};\n
  //     Subtitle:  ${notification.getSubtitle()};\n
  //     Message: ${notification.getMessage()};\n
  //     badge: ${notification.getBadgeCount()};\n
  //     sound: ${notification.getSound()};\n
  //     category: ${notification.getCategory()};\n
  //     content-available: ${notification.getContentAvailable()};\n
  //     Notification is clicked: ${String(isClicked)}.`;

  //   if (notification.getTitle() == undefined) {
  //     Alert.alert("Silent push notification Received", result, [
  //       {
  //         text: "Send local push",
  //         onPress: sendLocalNotification,
  //       },
  //     ]);
  //   } else {
  //     Alert.alert("Push Notification Received", result, [
  //       {
  //         text: "Dismiss",
  //         onPress: () => {},
  //       },
  //     ]);
  //   }
  // };

  // const onLocalNotification = (notification: any) => {
  //   const isClicked = notification.getData().userInteraction === 1;
  //   console.log("datasdsd", notification.getData());
  //   PushNotificationIOS.setApplicationIconBadgeNumber(42);
  //   Alert.alert(
  //     "Local Notification Received",
  //     `Alert title:  ${notification.getTitle()},
  //     Alert subtitle:  ${notification.getSubtitle()},
  //     Alert message:  ${notification.getMessage()},
  //     Badge: ${notification.getBadgeCount()},
  //     Sound: ${notification.getSound()},
  //     Thread Id:  ${notification.getThreadID()},
  //     Action Id:  ${notification.getActionIdentifier()},
  //     User Text:  ${notification.getUserText()},
  //     Notification is clicked: ${String(isClicked)}.`,
  //     [
  //       {
  //         text: "Dismiss",
  //         onPress: () => {},
  //       },
  //     ]
  //   );
  // };
  return (
    <View style={styles.body}>
      <Text style={[styles.text, { color: colors.text }]}>Profile Screen</Text>
      <AppText>Email {user?.email}</AppText>
      <AppText>Name {user?.name}</AppText>
      <AppText>Role {user?.account_role}</AppText>
      <TouchableOpacity onPress={handleLogOut}>
        <AppText>Logout</AppText>
      </TouchableOpacity>

      {/* <Button
        onPress={sendLocalNotification}
        label="Send fake local notification"
      /> */}
      <Button
        onPress={sendLocalNotificationWithSound}
        label="Send fake local notification with custom sound"
      />
    </View>
  );
};

export default ProfileScreen;
