import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";

const createStyles = () => StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor: '#5B5B7E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
      },
      buttonDisabled: {
        flexDirection: 'row',
        backgroundColor: 'rgba(91, 91, 126, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
      },
      name: {
        fontSize: RFValue(17),
        fontWeight: '700',
        color: '#fff',
        marginRight: 8,
      },
})

export default createStyles;