// importing dependencies
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { logout } from "./store/session";
import configureStore from "./store/store";
import "./index.css";

// import store stuff
let store = configureStore({});
window.store = store;
window.logout = logout;

// start of Root component
function Root() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);
}

// get the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// render the root component INSIDE the gotten root element
root.render(<Root />);
