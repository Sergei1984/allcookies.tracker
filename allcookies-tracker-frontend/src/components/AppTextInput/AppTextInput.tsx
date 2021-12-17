import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { styles } from "./styles";

interface Props extends TextInputProps {
  error?: boolean;
}

export const AppTextInput: React.FC<Props> = (props) => {
  const { colors } = useTheme();
  const { style, error = false } = props;
  const themeStyle = React.useMemo(() => {
    return {
      color: colors.text,
      borderColor: colors.border,
    };
  }, []);
  return (
    <View style={styles.textInputWrapper}>
      <TextInput
        placeholderTextColor={"#818B91"}
        {...props}
        style={
          error
            ? [styles.errorInput, themeStyle, style]
            : [styles.input, themeStyle, style]
        }
      />
      {/* {error ? (
        <MaterialIcons
          name={'error'}
          size={24}
          color="#EB5757"
          style={styles.errorIcon}
        />
      ) : null} */}
    </View>
  );
};
