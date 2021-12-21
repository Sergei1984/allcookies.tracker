import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import createStyles from "./styles";

interface IProductProp {
  name: string;
  count: number;
  handleIncrement: (name: string) => void;
  handleDecrement: (name: string) => void;
}

const ProductCount: React.FC<IProductProp> = (props) => {
  const styles = React.useMemo(() => createStyles(), []);

  const { name, count, handleIncrement, handleDecrement } = props;
  return (
    <View style={styles.productCountWrapper}>
      <AppText style={styles.productName}>{name}</AppText>
      <View style={styles.countWrapper}>
        <TouchableOpacity
          style={styles.countBtn}
          onPress={() => handleDecrement(name)}
        >
          <AppText style={styles.productName}>-</AppText>
        </TouchableOpacity>
        <AppText style={[styles.productName, { marginHorizontal: 10 }]}>
          {count}
        </AppText>
        <TouchableOpacity
          style={styles.countBtn}
          onPress={() => handleIncrement(name)}
        >
          <AppText style={styles.productName}>+</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCount;
