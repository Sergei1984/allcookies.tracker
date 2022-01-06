import React from "react";
import { Provider } from "react-redux";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { setupStore } from "./store/store";
import SplashScreen from "react-native-splash-screen";
import { Platform, StatusBar, AppState, Alert } from "react-native";
import { useColorScheme } from "react-native-appearance";
import BackgroundService from "react-native-background-actions";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { getDistance, getPreciseDistance } from "geolib";

const sleep = (time: any) =>
  new Promise((resolve: any) => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments: any) => {
  const { delay } = taskDataArguments;
  await new Promise(async (resolve) => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      PushNotificationIOS.addNotificationRequest({
        id: "notificationWithSound",
        title: "Sample Title",
        subtitle: "Sample Subtitle",
        body: "Sample local notification with custom sound",
        sound: "customSound.wav",
        badge: 12,
      });
      await sleep(delay);
    }
  });
};

const options = {
  taskName: "Example",
  taskTitle: "ExampleTask title",
  taskDesc: "ExampleTask description",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  parameters: {
    delay: 10000,
  },
};
export default function App() {
  const store = setupStore();
  const schema = useColorScheme();

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

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const _handleAppStateChange = async (nextAppState: any) => {
    console.log(nextAppState);
    if (nextAppState === "background") {
      await BackgroundService.start(veryIntensiveTask, options);
    }

    if (nextAppState !== "background") {
      await BackgroundService.stop();
    }
  };

  // React.useEffect(() => {
  //   AppState.addEventListener("change", _handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener("change", _handleAppStateChange);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   let dis = getDistance(
  //     { latitude: 50.026828, longitude: 36.222655 },
  //     { latitude: 50.034019, longitude: 36.220494 }
  //   );
  //   Alert.alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
  // }, []);

  return (
    <Provider store={store}>
      {Platform.OS === "ios" && schema !== "dark" ? (
        <StatusBar barStyle="dark-content" />
      ) : (
        <StatusBar barStyle="light-content" />
      )}
      <MainLayout />
    </Provider>
  );
}
