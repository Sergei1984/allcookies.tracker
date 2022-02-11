import { StyleSheet } from "react-native";

const createStyles = () => StyleSheet.create({
    toast: {
        position: 'absolute',
        height: 63,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        zIndex: 1,
        top: 10,
        left: 16
    },
    reportTitle: {
        color: '#858585',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 16
    },
})

export default createStyles;