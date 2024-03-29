import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React from "react";
import { AppState } from "react-native";
import { userSlice } from "../store/user/slice";
import { closeDayThunk, getActivityStatusThunk, openDayThunk } from "../store/user/thunk";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import useLocation from "./useLocation";

export const useTimer = () => {
    const [timer, setTimer] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);
    const {activity, activityStatus} = useAppSelector((state) => state.userReducer);
    const { setCurrentActivity } = userSlice.actions;
    const location = useLocation();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        (async () => {
            dispatch(getActivityStatusThunk());
            let isActiveTimer = await AsyncStorageLib.getItem("isActiveTimer");
            let currentActivity = await AsyncStorageLib.getItem('currentActivity');
            let date = await AsyncStorageLib.getItem('date');
            let getActualDate = date && new Date(JSON.parse(date)).getDate() === new Date().getDate();
            console.log('activityStatus', activityStatus)
            if (isActiveTimer && JSON.parse(isActiveTimer) === true && getActualDate) {
                setToggle(true);
                await dispatch(setCurrentActivity(currentActivity && JSON.parse(currentActivity)))
                return;
            }
            setToggle(false);
        })();
    }, []);

    const _handleAppStateChange = async (nextAppState: any) => {
        console.log(nextAppState);
        if (nextAppState === "background") {
        }

        if (nextAppState !== "background" || nextAppState !== "inactive") {
        (async () => {
            // let time = await AsyncStorageLib.getItem("startTimer");
            let isActiveTimer = await AsyncStorageLib.getItem("isActiveTimer");
            let currentActivity = await AsyncStorageLib.getItem('currentActivity');
            // let countOfSeconds = await AsyncStorageLib.getItem("countOfSeconds");
            if (isActiveTimer && JSON.parse(isActiveTimer) === true) {
            // setTimer(
            //     Math.floor((new Date().getTime() - +time!) / 1000) +
            //     JSON.parse(countOfSeconds!)
            // );
            setToggle(true);
            await dispatch(setCurrentActivity(currentActivity && JSON.parse(currentActivity)))
            }
        })();
        }
    };

    React.useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    // const getFormatedTime = (seconds: number) => {
    //     return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)![0];
    // };

    // React.useEffect(() => {
    //     let counter: any;
    //     if (toggle) {
    //     counter = setInterval(() => setTimer((timer) => timer + 1), 1000);
    //     }
    //     return () => {
    //     clearInterval(counter);
    //     };
    // }, [toggle]);

    // React.useEffect(() => {
    //     (async () => {
    //         const storageDate = await AsyncStorageLib.getItem('currentDate')
       
    //         if(storageDate && new Date(JSON.parse(storageDate!)).toLocaleDateString('uk-UA') !== new Date().toLocaleDateString('uk-UA')) {
    //             setTimer(0);
    //             await AsyncStorageLib.setItem("isActiveTimer", JSON.stringify(false));
    //             await AsyncStorageLib.setItem("countOfSeconds", JSON.stringify(0));
    //         }
    //     })()
    // }, []);

    

    const handleStart = async () => {
        setToggle(true);
        // await AsyncStorageLib.setItem(
        // "startTimer",
        // new Date().getTime().toString()
        // );
        // await AsyncStorageLib.setItem('currentDate', JSON.stringify(new Date()));
        await AsyncStorageLib.setItem("isActiveTimer", JSON.stringify(true));
        await AsyncStorageLib.setItem('date', JSON.stringify(new Date()))
        await dispatch(openDayThunk({location: location, time: new Date()}))
        // console.log('lol', activity && activity)
        // await AsyncStorageLib.setItem("currentActivity", JSON.stringify(activity && activity))
        // await AsyncStorageLib.setItem("countOfSeconds", JSON.stringify(timer));
    };

    const handleStop = async () => {
        setToggle(false);
        await AsyncStorageLib.setItem("isActiveTimer", JSON.stringify(false));
        await dispatch(closeDayThunk({location: location, time: new Date()}))
        // await AsyncStorageLib.setItem("currentActivity", JSON.stringify(null))
        // await AsyncStorageLib.setItem("countOfSeconds", JSON.stringify(timer));
    };

    return {
        timerData: {timer, toggle},
        handlers:  {handleStart, handleStop}
    }
}