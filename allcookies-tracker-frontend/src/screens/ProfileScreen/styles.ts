import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";

const createStyles = () => StyleSheet.create({
    body: {
        flex: 1,
        padding: SIZES.paddingHorizontal,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: RFValue(25),
        fontWeight: '300',
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonLabel: {
        color: 'blue',
      },
      input: {
        backgroundColor: Colors.VERYLIGHTBLUE,
        padding: SIZES.h5,
        borderWidth: 0,
        marginBottom: SIZES.paddingHorizontal
      },
      label: {
        marginBottom: 5
      },
      logOutButton: {
        backgroundColor: Colors.RED,
        padding: SIZES.h5,
        borderRadius: 8
      },
      logOutTitle: {
        fontSize: RFValue(16),
        fontWeight: '600',
        textAlign: 'center'
      }
})

export default createStyles;