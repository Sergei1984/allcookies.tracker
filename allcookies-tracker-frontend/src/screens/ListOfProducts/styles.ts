
import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";

const createStyles = () => StyleSheet.create({
    container: {
        padding: SIZES.paddingHorizontal
    },
    productWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderColor: Colors.PRIMARY,
        // borderRadius: SIZES.paddingHorizontal,
        // borderWidth: 1,
        marginBottom: SIZES.paddingHorizontal,
        width: '100%'
    },
    leftSide: {
        height: '100%',
        width: 68,
        backgroundColor: Colors.LIGHTGREY,
        borderRightColor: Colors.PRIMARY,
        borderWidth: 1,
        borderTopLeftRadius: SIZES.paddingHorizontal,
        borderBottomLeftRadius: SIZES.paddingHorizontal,
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 33,
        borderWidth: 1,
        borderLeftWidth: 0,
        paddingLeft: 10,
        borderTopRightRadius: SIZES.paddingHorizontal,
        borderBottomRightRadius: SIZES.paddingHorizontal,
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        backgroundColor: Colors.WHITE,
        marginBottom: SIZES.paddingHorizontal,
        paddingLeft: 36
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        left: 10
    },
    searchWrapper: {
        position: 'relative'
    }
})

export default createStyles;