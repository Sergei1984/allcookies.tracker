
import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";

const createStyles = () => StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: SIZES.paddingHorizontal
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        fontSize: RFValue(25),
        fontWeight: '300',
    },
    pointsWrapper: {
    //   margin: 10
    },
    title: {
        color: '#59597C',
        fontSize: RFValue(16),
        fontWeight: '600',
        marginTop: SIZES.paddingHorizontal
    },
    searchInput: {
        backgroundColor: Colors.WHITE,
        marginBottom: SIZES.paddingHorizontal,
        paddingLeft: 36,
        marginTop: 12
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 22,
        left: 10
    },
    searchWrapper: {
        position: 'relative'
    },
    renderItemPoint: {
        height: 150,
        width: '47%',
        borderWidth: 1,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
        marginRight: 15,
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZES.paddingHorizontal
    },
    renderItemText: {
        color: Colors.WHITE,
        fontSize: RFValue(14),
        fontWeight: '600'
    },
    avatar: {
        paddingTop: 20,
        height: 100,
        width: 100,
        borderRadius: 100,
        padding: 20,
    },
    timerButtonWrapper: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: Colors.PRIMARY,
        borderRadius: 14,
        alignItems: 'center',
        // padding: 27,
        width: '100%',
        marginTop: 16,
        justifyContent: 'space-between'
    },
    timerInnerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 26,
        borderLeftWidth: 1,
        paddingLeft: 26,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
    },
    timerTitle: {
        fontSize: RFValue(18),
        fontWeight: '400',
        marginLeft: 20,
        color: Colors.PRIMARY
    },
    startButton: {
        width: 68,
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        paddingVertical: 26,
        borderLeftWidth: 1,
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
     
      },
      buttonOpen: {
        // backgroundColor: "#F194FF",
      },
      buttonClose: {
        // backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        paddingHorizontal: SIZES.paddingHorizontal
      },

})

export default createStyles;