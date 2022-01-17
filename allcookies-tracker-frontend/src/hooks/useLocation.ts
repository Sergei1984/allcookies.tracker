import Geolocation from '@react-native-community/geolocation';
import React from 'react';

const useLocation = () => {
  const [location, setLocation] = React.useState({
    lat: 0,
    lon: 0,
  });

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
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

  return location
}

export default useLocation;
