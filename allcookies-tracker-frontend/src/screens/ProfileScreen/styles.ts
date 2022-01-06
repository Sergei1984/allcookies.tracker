import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";

const createStyles = () => StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
})

export default createStyles;