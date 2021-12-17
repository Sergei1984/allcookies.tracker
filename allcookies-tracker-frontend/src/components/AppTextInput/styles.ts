import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorInput: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 134, 134, 0.1)',
    borderColor: '#EB5757',
  },
  textInputWrapper: {
    position: 'relative',
  },
  errorIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
