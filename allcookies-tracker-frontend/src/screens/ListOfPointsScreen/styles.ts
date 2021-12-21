import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";

const createStyles = () => StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
})

export default createStyles;