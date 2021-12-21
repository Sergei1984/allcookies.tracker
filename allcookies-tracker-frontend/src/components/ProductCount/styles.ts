import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";

const createStyles = () => StyleSheet.create({
    productCountWrapper: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: SIZES.paddingHorizontal
    },
    countWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productName: {
        fontSize: RFValue(24),
        fontWeight: '300',
    },
    countBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,
        borderColor: '#00ff00',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default createStyles;