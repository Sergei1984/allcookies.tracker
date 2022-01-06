import React from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import createStyles from "./styles";

export const MapScreen: React.FC = () => {
  const styles = React.useMemo(() => createStyles(), []);
  const [markers, setMarkers] = React.useState<any>([]);
  const [latlng, setLatlng] = React.useState({
    lat: 0,
    lng: 0,
  });

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        setLatlng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (_error) => {
        console.log(_error);
      }
    );
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latlng.lat,
          longitude: latlng.lng,
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
