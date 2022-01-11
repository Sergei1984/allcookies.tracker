
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import React from 'react';
import RNLocation from 'react-native-location';

const useLocation = () => {

    React.useEffect(() => {
        RNLocation.configure({
            distanceFilter: 100, // Meters
            desiredAccuracy: {
              ios: 'best',
              android: 'balancedPowerAccuracy',
            },
            // Android only
            androidProvider: 'auto',
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: 'other',
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: 'portrait',
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
          });
          let locationSubscription: any = null;
          let locationTimeout: any = null;
          
          ReactNativeForegroundService.add_task(
            () => {
              RNLocation.requestPermission({
                ios: 'whenInUse',
                android: {
                  detail: 'fine',
                },
              }).then((granted) => {
                console.log('Location Permissions34334: ', granted);
                // if has permissions try to obtain location with RN location
                if (granted) {
                  locationSubscription && locationSubscription();
                  locationSubscription = RNLocation.subscribeToLocationUpdates(
                    ([locations]) => {
                      locationSubscription();
                      locationTimeout && clearTimeout(locationTimeout);
                      console.log(locations);
                    },
                  );
                } else {
                  locationSubscription && locationSubscription();
                  locationTimeout && clearTimeout(locationTimeout);
                  console.log('no permissions to obtain location');
                }
              });
            },
            {
              delay: 1000,
              onLoop: true,
              taskId: 144,
              onError: (e: any) => console.log('Error logging:', e),
            },
          );

          
    }, [])
   

    React.useEffect(()=> {
        (async () => {
            await ReactNativeForegroundService.start({
                id: 144,
                title: "Foreground Service",
                message: "you are online!",
              });
        })()
    }, [])
}

export default useLocation;
