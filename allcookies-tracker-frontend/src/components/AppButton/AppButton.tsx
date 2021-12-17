import React from "react";
import { Text, TouchableOpacityProps, TouchableOpacity } from "react-native";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
import createStyles from "./styles";

type Toucheble = TouchableOpacityProps & GenericTouchableProps;
interface Props extends Toucheble {
  name: string;
  icon?: boolean;
  disabled?: boolean;
}

export const AppButton: React.FC<Props> = (props) => {
  const { name, disabled = false, onPress } = props;
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
    </TouchableOpacity>
  );
};
