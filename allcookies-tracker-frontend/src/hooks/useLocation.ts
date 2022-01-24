import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Platform } from 'react-native';

const useLocation = () => {
  const [location, setLocation] = React.useState({
    lat: 0,
    lon: 0,
  });

  React.useEffect(() => {
    (async () => {
      await Geolocation.requestAuthorization();
    })()
  }, [])

  const getLocation = async () => {
  
      await Geolocation.getCurrentPosition(
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
