
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
        justifyContent: 'center',
        // borderColor: Colors.PRIMARY,
        // borderRadius: SIZES.paddingHorizontal,
        // borderWidth: 1,
        marginBottom: SIZES.paddingHorizontal,
        width: '100%'
    },
    leftSide: {
        height: '100%',
        width: 72,
        backgroundColor: Colors.WHITE,
        borderRightColor: Colors.PRIMARY,
        borderWidth: 1,
        borderTopLeftRadius: SIZES.paddingHorizontal,
        borderBottomLeftRadius: SIZES.paddingHorizontal,
        // justifyContent: 'center',
        alignItems: 'center',
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
    productCount: {
        // width: 50,
        // height: 35,
        backgroundColor: Colors.VERYLIGHTBLUE,
        borderRadius: 8,
    },
    productCountTitle: {
        fontSize: RFValue(24),
        fontWeight: '300',
    },
    decrement: {
        fontSize: RFValue(36)
    },
    increment: {
        fontSize: RFValue(36)
    },
    countBtn: {
      
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        backgroundColor: Colors.WHITE,
        marginBottom: SIZES.paddingHorizontal,
        paddingLeft: 36
    },
    imageWrapper: {
        flexDirection: 'row',
        marginTop: 8
    },
    avatar: {
        paddingTop: 20,
        height: 80,
        width: 80,
        borderRadius: 16,
        padding: 20,
        marginRight: 8
    },
    photoWrapper: {
        position: 'relative'
    },
    deletePhoto: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: '#232323',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 999,
        left: 68
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        left: 10
    },
    searchWrapper: {
        position: 'relative'
    },
    title: {
        color: '#59597C',
        fontSize: RFValue(16),
        fontWeight: '600',
        marginTop: SIZES.paddingHorizontal,
        marginBottom: 12
    },
})

export default createStyles;