import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppButton } from "../../components/AppButton";
import { AppText } from "../../components/AppText";
import { AppTextInput } from "../../components/AppTextInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import { getProductsThunk } from "../../store/product/thunk";
import { Product } from "../../store/product/types";
import createStyles from "./styles";

type Props = NativeStackScreenProps<HomeStackParamList, "ListOfProducts">;

const ListOfProducts: React.FC<Props> = ({ route, navigation }) => {
  const styles = React.useMemo(() => createStyles(), []);
  const dispatch = useAppDispatch();

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
    setProducts(dataOfProducts);
  }, [dataOfProducts]);

  //   const handleIncrement = React.useCallback(
  //     (name) => {
  //       let newProduct = dataOfProducts.map((el) =>
  //         el.title === name ? { ...el, count: el.count + 1 } : el
  //       );
  //       setProducts(newProduct);
  //     },
  //     [products]
  //   );

  //   const handleDecrement = React.useCallback(
  //     (name) => {
  //       let newProduct = products.map((el) =>
  //         el.title === name
  //           ? { ...el, count: el.count !== 0 ? el.count - 1 : 0 }
  //           : el
  //       );
  //       setProducts(newProduct);
  //     },
  //     [products]
  //   );

  const searchProduct = (value: string) => {
    const data = dataOfProducts.filter((item) => item.title.includes(value));
    setProducts(data);
  };

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
                // onPress={() => handleDecrement(item.title)}
              >
                <AppText style={styles.productName}>-</AppText>
              </TouchableOpacity>
              <AppText style={[styles.productName, { marginHorizontal: 10 }]}>
                {0}
              </AppText>
              <TouchableOpacity
                style={styles.countBtn}
                // onPress={() => handleIncrement(item.title)}
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
          style={{ marginBottom: 20, height: "80%" }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <AppButton name="Отправить отчет" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
