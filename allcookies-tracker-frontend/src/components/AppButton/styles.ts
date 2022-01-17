import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";

const createStyles = () => StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor:  Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
      },
      buttonDisabled: {
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY,
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