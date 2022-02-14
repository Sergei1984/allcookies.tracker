import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppText } from "../AppText";
import createStyles from "./styles";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { appSlice } from "../../store/app/slice";

interface Props {
  error: boolean;
  message: string;
}

export const AppNotification: React.FC<Props> = (props) => {
  const styles = React.useMemo(() => createStyles(), []);
  const { error, message } = props;
  const dispatch = useAppDispatch();
  const { showNotificationAction } = appSlice.actions;

  const handleCloseNotification = () => {
    dispatch(
      showNotificationAction({
        error: false,
        show: false,
        message: "",
      })
    );
  };

  return (
    <View
      style={
        error
          ? [styles.toast, { backgroundColor: "#FF8065" }]
          : [styles.toast, { backgroundColor: "#EFF4F7" }]
      }
    >
      {error ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons name="alert-circle" size={24} color={"white"} />
          <AppText style={styles.reportTitle} color={"white"}>
            {message}
          </AppText>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons name="checkmark-circle" size={24} color={"#42A6A6"} />
          <AppText style={styles.reportTitle}>{message}</AppText>
        </View>
      )}
      <TouchableOpacity onPress={handleCloseNotification}>
        <Ionicons
          name="ios-close-outline"
          size={32}
          color={error ? "white" : "#858585"}
        />
      </TouchableOpacity>
    </View>
  );
};
