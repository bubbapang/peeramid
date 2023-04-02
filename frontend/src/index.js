import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { logout } from "./store/session";
import configureStore from "./store/store";
import "./index.css";

let store = configureStore({});
window.store = store;
window.logout = logout;

function Root() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<Root />);
