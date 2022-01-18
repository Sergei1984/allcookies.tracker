import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {DASHBOARD} from "./routes/urls";
import {store} from "./store/rootStore";


const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route  element={<PrivateRoute/>}>
					<Route path={DASHBOARD} element={<div>Test</div>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);

export default App;
