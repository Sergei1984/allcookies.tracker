import React from "react";
import { Text, TouchableOpacityProps, TouchableOpacity } from "react-native";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import createStyles from "./styles";

type Touchable = TouchableOpacityProps & GenericTouchableProps;
interface Props extends Touchable {
  name: string;
  icon?: string;
  disabled?: boolean;
}

export const AppButton: React.FC<Props> = (props) => {
  const { name, disabled = false, onPress, icon } = props;
  const styles = React.useMemo(() => createStyles(), []);

  return (
    <TouchableOpacity
      style={disabled ? styles.buttonDisabled : styles.buttonWrapper}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        allowFontScaling={false}
        style={[styles.name, disabled ? { opacity: 0.3 } : { opacity: 1 }]}
      >
        {name}
      </Text>
      {!!icon ? <MaterialIcons name={icon} size={30} color="#fff" /> : null}
    </TouchableOpacity>
  );
};
