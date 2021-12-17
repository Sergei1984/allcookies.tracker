import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { styles } from "./styles";

export const Loader: React.FC = () => {
  const { loader } = useAppSelector((state) => state.appReducer);

  return (
    <>
      {loader ? (
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : null}
    </>
  );
};
