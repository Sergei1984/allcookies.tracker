import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  color?: string;
}

export const AppText: React.FC<Props> = (props) => {
  const { colors } = useTheme();
  const { children, style, color = colors.text } = props;

  return (
    <Text allowFontScaling={false} style={[style, { color: color }]}>
      {children}
    </Text>
  );
};
