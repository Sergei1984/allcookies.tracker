import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppButton } from "../../components/AppButton";
import { AppText } from "../../components/AppText";
import { AppTextInput } from "../../components/AppTextInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetImage } from "../../hooks/useGetImage";
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import { getProductsThunk } from "../../store/product/thunk";
import { Product } from "../../store/product/types";
import ImagePicker from "react-native-image-crop-picker";
import createStyles from "./styles";

type Props = NativeStackScreenProps<HomeStackParamList, "ListOfProducts">;

const ListOfProducts: React.FC<Props> = ({ route, navigation }) => {
  const styles = React.useMemo(() => createStyles(), []);
  const dispatch = useAppDispatch();
  const { data, handle } = useGetImage();

  React.useEffect(() => {
    (async () => {
      await dispatch(getProductsThunk());
    })();
  }, []);

  const { data: dataOfProducts, total } = useAppSelector(
    (state) => state.productReducer
  );

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setProducts(dataOfProducts.map((item) => ({ ...item, count: 0 })));
  }, [dataOfProducts]);

  const handleIncrement = React.useCallback(
    (name) => {
      let newProduct = products.map((el) =>
        el.title === name ? { ...el, count: el.count + 1 } : el
      );
      setProducts(newProduct);
    },
    [products]
  );

  const handleDecrement = React.useCallback(
    (name) => {
      let newProduct = products.map((el) =>
        el.title === name
          ? { ...el, count: el.count !== 0 ? el.count - 1 : 0 }
          : el
      );
      setProducts(newProduct);
    },
    [products]
  );

  console.log("products", products);

  const searchProduct = (value: string) => {
    const data = dataOfProducts.filter((item) => item.title.includes(value));
    setProducts(data);
  };

  const sendReport = React.useCallback(() => {
    console.log(
      products.flatMap((item) =>
        item.count !== 0 ? { product_id: item.id, quantity: item.count } : []
      )
    );
  }, [products]);

  const renderProducts = () => {
    const renderItem = ({ item }: any) => {
      return (
        <View style={styles.productWrapper}>
          <View style={styles.leftSide}></View>
          <View style={styles.rightSide}>
            <AppText>{item.title}</AppText>
            <View style={styles.countWrapper}>
              <TouchableOpacity
                style={styles.countBtn}
                onPress={() => handleDecrement(item.title)}
              >
                <AppText style={styles.productName}>-</AppText>
              </TouchableOpacity>
              <AppText style={[styles.productName, { marginHorizontal: 10 }]}>
                {item.count}
              </AppText>
              <TouchableOpacity
                style={styles.countBtn}
                onPress={() => handleIncrement(item.title)}
              >
                <AppText style={styles.productName}>+</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View>
        <FlatList
          data={products}
          style={{ marginBottom: 20, height: "60%" }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <AppButton name="Отправить отчет" onPress={sendReport} />
      </View>
    );
  };

  console.log(data.images, "images");
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <AppButton
          name="Сделать фото"
          onPress={() => handle.pickSingle(true)}
        />
        {/* Photos */}
        <View style={styles.imageWrapper}>
          {data.images.map((item, index) => {
            return (
              <Image
                key={"photo" + index}
                style={styles.avatar}
                source={item}
              />
            );
          })}
        </View>
      </View>
      <View>
        <AppText style={styles.title}>Список товаров:</AppText>
      </View>
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
          onChangeText={(value) => searchProduct(value)}
        />
      </View>
      {renderProducts()}
    </View>
  );
};

export default ListOfProducts;
