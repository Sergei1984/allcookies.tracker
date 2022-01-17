import React from "react";
import {Provider} from "react-redux";
import {store} from "./store/rootStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./containers/login/login";
import Dashboard from "./containers/dashboard/dashboard";


const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Routes>

				<Route path="/login" element={<Login/>}/>
				<Route path="/" element={<Dashboard/>}/>
			</Routes>
		</BrowserRouter>
	</Provider>
);

export default App;
