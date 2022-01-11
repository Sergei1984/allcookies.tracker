import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import createStyles from "./styles";
import { getSellingPointsThunk } from "../../store/sellingPoint/thunk";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTimer } from "../../hooks/useTimer";
import { AppTextInput } from "../../components/AppTextInput/AppTextInput";
import { SellingPoint } from "../../store/sellingPoint/types";
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const { timerData, handlers } = useTimer();
  const styles = React.useMemo(() => createStyles(), []);

  const dispatch = useAppDispatch();

  const [shops, setShops] = React.useState<SellingPoint[]>();
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      await dispatch(getSellingPointsThunk());
    })();
  }, []);

  const { data: sellingPointData, total } = useAppSelector(
    (state) => state.sellingPointReducer
  );

  React.useEffect(() => {
    setShops(sellingPointData);
  }, [sellingPointData]);

  const searchShop = (value: string) => {
    const data = sellingPointData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setShops(data);
  };

  const navigateToDetails = (title: string) => {
    if (timerData.toggle) {
      navigation.navigate("Список товаров", { title: title });
      return;
    }
    setModalVisible(true);
  };

  const renderShopPoints = () => {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          style={styles.renderItemPoint}
          onPress={() => navigateToDetails(item.title)}
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
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {/* Timer to start work */}
      <AppText style={styles.title}>Таймер начала работы</AppText>

      <View style={styles.timerButtonWrapper}>
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
      </View>

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
        animationType="slide"
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

      {/* Count of products
      {products.map((item, index) => {
        return (
          <ProductCount
            key={"product" + index}
            name={item.name}
            count={item.count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        );
      })}
      <TouchableOpacity onPress={() => handle.pickSingle(true)}>
        {data.image ? (
          <Image style={styles.avatar} source={data.image} />
        ) : (
          <AppText>Choose photo</AppText>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handle.pickSingleWithCamera(true)}>
        {data.image ? (
          <Image style={styles.avatar} source={data.image} />
        ) : (
          <AppText>Open camera</AppText>
        )}
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;
