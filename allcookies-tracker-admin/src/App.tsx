import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/rootStore";
import { SnackbarProvider } from "notistack";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <AppRoutes />
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
