import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppButton } from "../../components/AppButton";
import { AppText } from "../../components/AppText";
import { AppTextInput } from "../../components/AppTextInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetImage } from "../../hooks/useGetImage";
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import {
  getProductsThunk,
  searchProductThunk,
} from "../../store/product/thunk";
import createStyles from "./styles";
import { checkSellingPointThunk } from "../../store/sellingPoint/thunk";
import useLocation from "../../hooks/useLocation";
import { RFValue } from "react-native-responsive-fontsize";
import { useDebounce } from "../../hooks/useDebounce";
import { productSlice } from "../../store/product/slice";

type Props = NativeStackScreenProps<HomeStackParamList, "ListOfProducts">;

const ListOfProducts: React.FC<Props> = ({ route, navigation }) => {
  const styles = React.useMemo(() => createStyles(), []);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigation();
  const { data, handle } = useGetImage();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showReportToast, setShowReportToast] = React.useState(false);

  const {
    data: dataOfProducts,
    filteredData,
    total,
  } = useAppSelector((state) => state.productReducer);

  const { errorReport } = useAppSelector((state) => state.sellingPointReducer);

  React.useEffect(() => {
    (async () => {
      await dispatch(getProductsThunk({ skip: 0, take: 20 }));
    })();
  }, []);

  const { handleIncrementCount, handleDecrementCount, clearDefaultData } =
    productSlice.actions;

  const handleIncrement = React.useCallback((name) => {
    dispatch(handleIncrementCount(name));
  }, []);

  const handleDecrement = React.useCallback((name) => {
    dispatch(handleDecrementCount(name));
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    dispatch(searchProductThunk(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  // const searchProduct = (value: string) => {
  //   const data = products.map((item) =>
  //     item.title
  //       .replace(/[^A-Za-zА-Яа-я0-9]/g, "")
  //       .toLowerCase()
  //       .includes(value.replace(/[^A-Za-zА-Яа-я0-9]/g, "").toLowerCase())
  //       ? { ...item, isShow: true }
  //       : { ...item, isShow: false }
  //   );
  //   setProducts(data);
  // };

  const activity = useAppSelector(
    (state) => state.sellingPointReducer.activityId
  );

  const sendReport = React.useCallback(async () => {
    const dataProducts = dataOfProducts.flatMap((item) =>
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
    await dispatch(clearDefaultData());
    handle.setImages([]);
    setShowReportToast(true);
  }, [dataOfProducts, activity, data.images]);

  React.useEffect(() => {
    if (showReportToast) {
      setTimeout(() => {
        setShowReportToast(false);
      }, 5000);
    }
  }, [showReportToast]);

  const handleLoadMore = React.useCallback(async () => {
    if (dataOfProducts.length < total) {
      await dispatch(
        getProductsThunk({ skip: dataOfProducts.length, take: 20 })
      );
    }
  }, [dataOfProducts]);

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
          data={
            debouncedSearchTerm
              ? dataOfProducts.filter((item1) =>
                  filteredData.some((item2) => item2.id === item1.id)
                )
              : dataOfProducts
          }
          style={{
            marginBottom: 20,
            height: data.images.length ? "47%" : "60%",
            minHeight: "47%",
          }}
          renderItem={renderItem}
          keyExtractor={(_, index) => "products" + index}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        <AppButton
          name="Отправить отчет"
          onPress={sendReport}
          disabled={!dataOfProducts.find((item) => item.count !== 0)}
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
      {showReportToast && (
        <View
          style={
            errorReport
              ? [styles.toast, { backgroundColor: "red" }]
              : [styles.toast, { backgroundColor: "#EFF4F7" }]
          }
        >
          {errorReport ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons name="alert-circle" size={24} color={"red"} />
              <AppText style={styles.reportTitle}>Отчет не отправлен</AppText>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons name="checkmark-circle" size={24} color={"#42A6A6"} />
              <AppText style={styles.reportTitle}>Отчет отправлен</AppText>
            </View>
          )}
          <TouchableOpacity onPress={() => setShowReportToast(false)}>
            <Ionicons name="ios-close-outline" size={32} color={"#858585"} />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ marginBottom: 16 }}>
        <AppButton
          name="Сделать фото"
          onPress={() => handle.pickSingle(true)}
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
          onChangeText={(value) => setSearchTerm(value)}
        />
      </View>
      {renderProducts()}
    </View>
  );
};

export default ListOfProducts;
