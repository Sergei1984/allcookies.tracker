import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";
const createStyles = () => StyleSheet.create({
    text: {
        fontSize: RFValue(25),
        fontWeight: '300',
    },
    mainContent: {
        flex: 0.7,
        justifyContent:"center"
    },
    input: {
        marginVertical: SIZES.paddingHorizontal / 2,
    },
    container: {
        flex: 1,
        paddingHorizontal: SIZES.paddingHorizontal
    },
    footer: {
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingBottom: SIZES.marginBottomBig,
    }
})

export default createStyles;