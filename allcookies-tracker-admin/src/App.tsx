import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/rootStore";

import AppRoutes from "./routes";

const App = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default App;
