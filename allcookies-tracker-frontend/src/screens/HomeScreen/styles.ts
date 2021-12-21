import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";
const createStyles = () => StyleSheet.create({
    body: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        fontSize: RFValue(25),
        fontWeight: '300',
    },
    pointsWrapper: {
      margin: 10
    },
    renderItemPoint: {
        height: 150,
        width: 150,
        borderWidth: 1,
        borderColor: '#00ff00',
        borderRadius: 20,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        paddingTop: 20,
        height: 100,
        width: 100,
        borderRadius: 100,
        padding: 20,
    }
})

export default createStyles;