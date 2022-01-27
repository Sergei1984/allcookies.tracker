import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
import { checkSellingPointThunk } from "../../store/sellingPoint/thunk";
import useLocation from "../../hooks/useLocation";
import { RFValue } from "react-native-responsive-fontsize";
import { btoa, atob, toByteArray } from "react-native-quick-base64";
import { uploadPhotoThunk } from "../../store/user/thunk";

type Props = NativeStackScreenProps<HomeStackParamList, "ListOfProducts">;

const ListOfProducts: React.FC<Props> = ({ route, navigation }) => {
  const styles = React.useMemo(() => createStyles(), []);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigation();
  const { data, handle } = useGetImage();

  React.useEffect(() => {
    (async () => {
      await dispatch(getProductsThunk({ skip: 0, take: 20 }));
    })();
  }, []);

  const { data: dataOfProducts, total } = useAppSelector(
    (state) => state.productReducer
  );

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setProducts(
      dataOfProducts.map((item) => ({ ...item, count: 0, isShow: true }))
    );
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

  const searchProduct = (value: string) => {
    const data = products.map((item) =>
      item.title
        .replace(/[^A-Za-zА-Яа-я0-9]/g, "")
        .toLowerCase()
        .includes(value.replace(/[^A-Za-zА-Яа-я0-9]/g, "").toLowerCase())
        ? { ...item, isShow: true }
        : { ...item, isShow: false }
    );
    setProducts(data);
  };

  const activity = useAppSelector(
    (state) => state.sellingPointReducer.activityId
  );

  const sendReport = React.useCallback(async () => {
    const dataProducts = products.flatMap((item) =>
      item.count !== 0 ? { product_id: item.id, quantity: item.count } : []
    );
    await dispatch(
      checkSellingPointThunk({
        location: location,
        time: new Date(),
        products: dataProducts,
        selling_point_id: route.params.sellingPointId,
        images: data.images,
      })
    );
    navigation.navigate("Главная");
  }, [products, activity, data.images]);

  const handleLoadMore = async () => {
    await dispatch(getProductsThunk({ skip: products.length, take: 20 }));
  };

  console.log("products", dataOfProducts.length);
  const renderProducts = () => {
    const renderItem = ({ item }: any) => {
      return (
        <View style={styles.productWrapper}>
          <View style={styles.leftSide}>
            <View style={{ justifyContent: "center", flexGrow: 1 }}>
              <Image
                source={{ uri: item.image_url }}
                style={{ height: 80, width: 60, resizeMode: "contain" }}
              />
            </View>
          </View>
          <View style={styles.rightSide}>
            <AppText
              color={"#24244A"}
              style={{
                fontSize: RFValue(14),
                fontWeight: "600",
                flexWrap: "wrap",
                width: 150,
              }}
            >
              {item.title}
            </AppText>
            <View style={styles.countWrapper}>
              <TouchableOpacity
                style={styles.countBtn}
                onPress={() => handleDecrement(item.title)}
              >
                <MaterialCommunityIcons
                  name={"minus"}
                  size={32}
                  color={"#24244A"}
                />
              </TouchableOpacity>
              <View style={styles.productCount}>
                <AppText
                  style={[styles.productCountTitle, { marginHorizontal: 10 }]}
                >
                  {item.count}
                </AppText>
              </View>

              <TouchableOpacity
                style={styles.countBtn}
                onPress={() => handleIncrement(item.title)}
              >
                <MaterialCommunityIcons
                  name={"plus"}
                  size={32}
                  color={"#24244A"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

    return (
      <View>
        <FlatList
          data={products.flatMap((item) => (item.isShow ? item : []))}
          style={{
            marginBottom: 20,
            height: data.images.length ? "47%" : "60%",
          }}
          renderItem={renderItem}
          keyExtractor={(_, index) => "products" + index}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
        />
        <AppButton
          name="Отправить отчет"
          onPress={sendReport}
          disabled={!products.find((item) => item.count !== 0)}
        />
      </View>
    );
  };

  const renderPhotos = () => {
    const renderItem = ({ item }: any) => {
      const deletePhoto = (index: number) => {
        handle.setImages(
          data.images.filter((item: any) => item.index !== index)
        );
      };

      return (
        <View style={styles.photoWrapper}>
          <TouchableOpacity
            style={styles.deletePhoto}
            onPress={() => deletePhoto(item.index)}
          >
            <MaterialIcons name="close" size={16} color={"#232323"} />
          </TouchableOpacity>
          <Image style={styles.avatar} source={item} />
        </View>
      );
    };
    return (
      <View>
        <FlatList
          data={data.images}
          style={{ marginVertical: 10 }}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item, index) => item.mime + index}
        />
      </View>
    );
  };

  // React.useEffect(() => {
  //   if (data.images.length) {
  //     const data1 = new FormData();
  //     data1.append("file", data.image);
  //     (async () => {
  //       await dispatch(
  //         uploadPhotoThunk({
  //           id: activity,
  //           photo: data1,
  //         })
  //       );
  //     })();
  //   }
  // }, [data.images]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <AppButton
          name="Сделать фото"
          onPress={() => handle.pickSingleWithCamera(true)}
        />
        {/* Photos */}
        {renderPhotos()}
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
