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

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const dataCount = [
    { name: "test1", count: 3 },
    { name: "test2", count: 7 },
    { name: "test3", count: 9 },
  ];

  const [diffTime, setDiffTime] = React.useState(0);
  // React.useEffect(() => {
  //   (async () => {
  //     let time = await AsyncStorageLib.getItem("startTimer");
  //     console.log(time);
  //     setDiffTime(
  //       Math.floor((new Date(new Date().getTime() - +time!) as any) / 1000)
  //     );
  //     stopwatchOffset.setSeconds(
  //       stopwatchOffset.getSeconds() +
  //         Math.floor((new Date(new Date().getTime() - +time!) as any) / 1000)
  //     );
  //   })();
  // }, []);
  const [timer, setTimer] = React.useState(0);

  const _handleAppStateChange = async (nextAppState: any) => {
    console.log(nextAppState);
    if (nextAppState === "background") {
    }

    if (nextAppState !== "background") {
      (async () => {
        let time = await AsyncStorageLib.getItem("startTimer");

        // setDiffTime(
        //   Math.floor((new Date(new Date().getTime() - +time!) as any) / 1000)
        // );
        console.log(time);
        console.log(Math.floor((new Date().getTime() - +time!) / 1000));
        setTimer(Math.floor((new Date().getTime() - +time!) / 1000));
        setToggle(true);
        // handleStart();
      })();
    }
  };

  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  // const stopwatchOffset = new Date();
  // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + diffTime);

  // console.log(diffTime);
  // const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
  //   useStopwatch({
  //     autoStart: false,
  //     offsetTimestamp: stopwatchOffset,
  //   });

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

  // const startTime = async () => {
  //   await AsyncStorageLib.setItem(
  //     "startTimer",
  //     new Date().getTime().toString()
  //   );
  //   start();
  // };

  // const stopTime = () => {
  //   pause();
  // };

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

  // const clockify = () => {
  //   let displayHours = hours < 10 ? `0${hours}` : hours;
  //   let displayMins = minutes < 10 ? `0${minutes}` : minutes;
  //   let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
  //   return {
  //     displayHours,
  //     displayMins,
  //     displaySecs,
  //   };
  // };

  const [toggle, setToggle] = React.useState(false);

  const getFormatedTime = (seconds: number) => {
    return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)![0];
  };

  React.useEffect(() => {
    let counter: any;
    if (toggle) {
      counter = setInterval(() => setTimer((timer) => timer + 1), 1000);
    }
    return () => {
      clearInterval(counter);
    };
  }, [toggle]);

  const handleStart = async () => {
    setToggle(true);
    await AsyncStorageLib.setItem(
      "startTimer",
      new Date().getTime().toString()
    );
  };

  const handleStop = () => {
    setToggle(false);
  };

  const handleReset = () => {
    setTimer(0);
    setToggle(false);
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
            Таймер: {getFormatedTime(timer)}
          </AppText>
        </View>
        {toggle ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStop}>
            <MaterialIcons name={"play-arrow"} size={30} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
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
