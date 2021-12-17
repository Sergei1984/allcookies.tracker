import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";

const createStyles = () => StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor: '#FCF119',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
      },
      buttonDisabled: {
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 241, 25, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
      },
      name: {
        fontSize: RFValue(17),
        fontWeight: '700',
        color: '#000',
        marginRight: 8,
      },
})

export default createStyles;