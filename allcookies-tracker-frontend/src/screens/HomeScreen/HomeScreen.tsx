import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "../../components/AppText";
import createStyles from "./styles";
import {
  getNewSellingPointsThunk,
  getSellingPointsThunk,
} from "../../store/sellingPoint/thunk";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTimer } from "../../hooks/useTimer";
import { AppTextInput } from "../../components/AppTextInput/AppTextInput";
import { SellingPoint } from "../../store/sellingPoint/types";
import useLocation from "../../hooks/useLocation";
import { AppButton } from "../../components/AppButton/AppButton";
import { UserAPI } from "../../services/user.service";
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const { timerData, handlers } = useTimer();
  const styles = React.useMemo(() => createStyles(), []);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [shops, setShops] = React.useState<SellingPoint[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await dispatch(getSellingPointsThunk());
    })();
  }, []);

  const {
    data: sellingPointData,
    total,
    newSellingPoints,
  } = useAppSelector((state) => state.sellingPointReducer);

  React.useEffect(() => {
    setShops(sellingPointData);
  }, [sellingPointData]);

  const searchShop = React.useCallback(
    (value: string) => {
      const data = sellingPointData.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setShops(data);
    },
    [sellingPointData]
  );

  const navigateToDetails = React.useCallback(
    (title: string, id: number) => {
      if (timerData.toggle) {
        navigation.navigate("Список товаров", {
          title: title,
          sellingPointId: id,
        });
        return;
      }
      setModalVisible(true);
    },
    [modalVisible, timerData.toggle]
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(getNewSellingPointsThunk(location));
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    setShops(newSellingPoints);
  }, [newSellingPoints]);

  const renderShopPoints = () => {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          style={styles.renderItemPoint}
          onPress={() => navigateToDetails(item.title, item.id)}
        >
          <AppText style={styles.renderItemText} color="#fff">
            {item.title}
          </AppText>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.pointsWrapper}>
        <FlatList
          data={shops}
          style={{ height: "60%" }}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  };

  // React.useEffect(() => {
  //   (async () => {
  //     await UserAPI.getActivity();
  //   })();
  // }, []);

  const activity = useAppSelector((state) => state.userReducer.activity);

  React.useEffect(() => {
    (async () => {
      if (timerData.toggle) {
        console.log("activtiys", activity && activity);
        await AsyncStorageLib.setItem(
          "currentActivity",
          JSON.stringify(activity && activity)
        );
        return;
      }
      // await AsyncStorageLib.setItem("currentActivity", JSON.stringify(null));
    })();
  }, [timerData.toggle, activity]);

  return (
    <View style={styles.body}>
      {/* Timer to start work */}
      <AppText style={styles.title}>Таймер начала работы</AppText>

      {/* <View style={styles.timerButtonWrapper}>
        <View style={styles.timerInnerWrapper}>
          <MaterialIcons name={"access-time"} size={30} color="#59597C" />
          <AppText style={styles.timerTitle} color="#59597C">
            Таймер: {handlers.getFormatedTime(timerData.timer)}
          </AppText>
        </View>
        {timerData.toggle ? (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handlers.handleStop}
          >
            <MaterialIcons name={"stop"} size={30} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handlers.handleStart}
          >
            <MaterialIcons name={"play-arrow"} size={30} color="#fff" />
          </TouchableOpacity>
        )}
      </View> */}
      {!timerData.toggle ? (
        <AppButton
          onPress={handlers.handleStart}
          name="Начать день"
          icon={"play-arrow"}
        />
      ) : (
        <AppButton
          onPress={handlers.handleStop}
          name="Закончить день"
          icon={"stop"}
        />
      )}

      {/* Magazine points */}
      <AppText style={styles.title}>Список магазинов:</AppText>
      <View style={styles.searchWrapper}>
        <MaterialIcons
          name="search"
          size={24}
          color={"#9098B1"}
          style={styles.searchIcon}
        />
        <AppTextInput
          style={styles.searchInput}
          placeholder="Поиск"
          onChangeText={(value) => searchShop(value)}
        />
      </View>
      {renderShopPoints()}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                borderBottomColor: "rgba(60, 60, 67, 0.29)",
                borderBottomWidth: 1,
                marginHorizontal: -35,
                marginBottom: 16,
              }}
            >
              <AppText style={[styles.modalText, { fontWeight: "600" }]}>
                Включите таймер
              </AppText>
              <AppText style={styles.modalText}>
                Прежде чем начать работать, пожалуйста, включите таймер.
              </AppText>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AppText style={styles.textStyle}>OK</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
