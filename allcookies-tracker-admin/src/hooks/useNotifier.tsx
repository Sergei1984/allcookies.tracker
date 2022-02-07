import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { removeNotificationAction } from "../store/app/actions";
import { RootStore } from "../store/rootStore";

let displayed: any[] = [];

interface NotificationModel {
  key: any;
  message: string;
  options: any;
  dismissed: boolean;
}

const useNotifier = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const notifications: NotificationModel[] = useSelector(
    (store: RootStore) =>
      store.appStore.notifications || ([] as NotificationModel[])
  );

  const storeDisplayed = (id: any) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: any) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(removeNotificationAction(myKey));
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
