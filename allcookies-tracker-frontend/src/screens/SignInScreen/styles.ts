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
    title: {
        color: Colors.BLACK,
        fontWeight: '700',
        fontSize: RFValue(16),
        textAlign: 'center',
        marginTop: 24,
    },
    preTitle: {
        fontWeight: '400',
        fontSize: RFValue(12),
        color: Colors.LIGHTGREY,
        marginTop: 8,
        marginBottom: 28,
        textAlign: 'center'
    },
    input: {
        marginVertical: SIZES.paddingHorizontal / 2,
        color: Colors.BLACK
    },
    container: {
        flex: 1,
        paddingHorizontal: SIZES.paddingHorizontal
    },
    footer: {
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingBottom: SIZES.marginBottomBig,
    },
    logoWrapper: {
        alignItems: 'center',
    }
})

export default createStyles;