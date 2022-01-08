import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import {
  AppState,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "../../components/AppText";
import createStyles from "./styles";
import ImagePicker from "react-native-image-crop-picker";
import { useGetImage } from "../../hooks/useGetImage";
import { useDispatch } from "react-redux";
import { getSellingPointsThunk } from "../../store/sellingPoint/thunk";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { SellingPoint } from "../../store/sellingPoint/types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useStopwatch } from "react-timer-hook";
import { useTimer } from "../../hooks/useTimer";

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const dataCount = [
    { name: "test1", count: 3 },
    { name: "test2", count: 7 },
    { name: "test3", count: 9 },
  ];

  const { timerData, handlers } = useTimer();

  const { data, handle } = useGetImage();
  const styles = React.useMemo(() => createStyles(), []);
  // const { colors } = useTheme();
  const [products, setProducts] = React.useState(dataCount);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(getSellingPointsThunk());
    })();
  }, []);

  const { data: sellingPointData, total } = useAppSelector(
    (state) => state.sellingPointReducer
  );

  const handleIncrement = React.useCallback(
    (name) => {
      let newProduct = products.map((el) =>
        el.name === name ? { ...el, count: el.count + 1 } : el
      );
      setProducts(newProduct);
    },
    [products]
  );

  const handleDecrement = React.useCallback(
    (name) => {
      let newProduct = products.map((el) =>
        el.name === name
          ? { ...el, count: el.count !== 0 ? el.count - 1 : 0 }
          : el
      );
      setProducts(newProduct);
    },
    [products]
  );

  const renderShopPoints = () => {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          style={styles.renderItemPoint}
          onPress={() =>
            navigation.navigate("Список товаров", { title: item.title })
          }
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
          data={sellingPointData}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {/* Magazine points */}
      <AppText style={styles.title}>Список магазинов:</AppText>
      {renderShopPoints()}
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
