import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const DismissKeyboardView: React.FC<Props> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      {children}
    </TouchableWithoutFeedback>
  );
};
