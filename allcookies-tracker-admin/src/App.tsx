import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/rootStore";
import { SnackbarProvider } from "notistack";
import AppRoutes from "./routes";

import SnackMessage from "./components/snack-message";
import { MessageModel } from "./models/notification.model";

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        content={(key, message: MessageModel) => (
          <SnackMessage
            id={key}
            title={message.title}
            message={message.message}
            variant={message.type}
          />
        )}
      >
        <AppRoutes />
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
