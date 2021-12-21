import React from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import images from "../../constants/images";
import createStyles from "./styles";

export const ListOfPointsScreen: React.FC = () => {
  const styles = React.useMemo(() => createStyles(), []);
  const [markers, setMarkers] = React.useState<any>([]);

  console.log(markers);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) =>
          setMarkers([...markers, { latlng: e.nativeEvent.coordinate }])
        }
      >
        {markers.map((marker: any, index: number) => (
          <Marker key={index} coordinate={marker.latlng} />
        ))}
      </MapView>
    </View>
  );
};

export default ListOfPointsScreen;
