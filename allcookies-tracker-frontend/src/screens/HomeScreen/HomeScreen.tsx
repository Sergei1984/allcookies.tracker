import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
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
  createSellingPointThunk,
  getNewSellingPointsThunk,
  getSellingPointsThunk,
  searchSellingPointThunk,
} from "../../store/sellingPoint/thunk";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTimer } from "../../hooks/useTimer";
import { AppTextInput } from "../../components/AppTextInput/AppTextInput";
import { SellingPoint } from "../../store/sellingPoint/types";
import useLocation from "../../hooks/useLocation";
import { AppButton } from "../../components/AppButton/AppButton";
import { useDebounce } from "../../hooks/useDebounce";
import { AppNotification } from "../../components/AppNotification";
import { appSlice } from "../../store/app/slice";
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
  const [newShopTitle, setNewShopTitle] = React.useState("");
  const [modalVisibleShop, setModalVisibleShop] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await dispatch(getSellingPointsThunk({ skip: 0, take: 20 }));
    })();
  }, []);

  const {
    data: sellingPointData,
    total,
    newSellingPoints,
  } = useAppSelector((state) => state.sellingPointReducer);

  const { notification } = useAppSelector((state) => state.appReducer);

  const handleLoadMore = React.useCallback(async () => {
    if (sellingPointData.length < total) {
      await dispatch(
        getSellingPointsThunk({ skip: sellingPointData.length, take: 20 })
      );
    }
  }, [sellingPointData.length]);

  React.useEffect(() => {
    setShops(sellingPointData);
  }, [sellingPointData]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    dispatch(searchSellingPointThunk(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

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

  const handleChangeNewShop = React.useCallback((value: string) => {
    setNewShopTitle(value);
  }, []);

  const handleAddNewShop = React.useCallback(async () => {
    await dispatch(
      createSellingPointThunk({
        title: newShopTitle,
        location: location,
        is_disabled: false,
      })
    );
    setModalVisibleShop(!modalVisibleShop);
  }, [newShopTitle]);

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
    })();
  }, [timerData.toggle, activity]);

  const { showNotificationAction } = appSlice.actions;

  React.useEffect(() => {
    if (notification.show) {
      setTimeout(() => {
        dispatch(
          showNotificationAction({
            error: false,
            show: false,
            message: "",
          })
        );
      }, 5000);
    }
  }, [notification.show]);

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
          style={{ height: "60%", marginTop: 16 }}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString() + index}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {notification.show && (
        <AppNotification
          error={notification.error}
          message={notification.message}
        />
      )}
      {/* Timer to start work */}
      <AppText style={styles.title}>Таймер начала работы</AppText>

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
          onChangeText={(value) => setSearchTerm(value)}
        />
        <AppButton
          name="Добавить магазин"
          onPress={() => setModalVisibleShop(true)}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleShop}
        onRequestClose={() => {
          setModalVisibleShop(!modalVisibleShop);
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
                Добавить магазин
              </AppText>
              <AppText style={styles.modalText}>
                Введите название магазина который хотите добавить
              </AppText>
              <AppTextInput
                style={styles.addShopInput}
                onChangeText={(value) => handleChangeNewShop(value)}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibleShop(!modalVisibleShop)}
              >
                <AppText style={styles.textStyle} color="#F04E47">
                  Отмена
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleAddNewShop}
              >
                <AppText style={styles.textStyle} color="#42A6A6">
                  Добавить
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
