import AsyncStorageLib from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import ProductCount from "../../components/ProductCount/ProductCount";
import createStyles from "./styles";
import ImagePicker from "react-native-image-crop-picker";
import { useGetImage } from "../../hooks/useGetImage";
interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const HomeScreen: React.FC<IProps> = ({ navigation }) => {
  const dataCount = [
    { name: "test1", count: 3 },
    { name: "test2", count: 7 },
    { name: "test3", count: 9 },
  ];

  const dataPoints = [
    { id: "1", name: "Point1" },
    { id: "2", name: "Point2" },
    { id: "3", name: "Point3" },
  ];
  const { data, handle } = useGetImage();
  const styles = React.useMemo(() => createStyles(), []);
  const { colors } = useTheme();
  const [products, setProducts] = React.useState(dataCount);

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
        <TouchableOpacity style={styles.renderItemPoint}>
          <AppText>{item.name}</AppText>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.pointsWrapper}>
        <FlatList
          data={dataPoints}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {/* Magazine points */}
      {renderShopPoints()}
      {/* Count of products */}
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
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
