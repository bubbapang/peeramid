// import dependencies
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import session things
import session from "./session";
import sessionErrors from "./sessionErrors";

// import ratings and suggestions
import ratings from "./ratings";
import suggestions from "./suggestions";

// import likes and pins
import likes from "./likes";
import pins from "./pins";

// combine sub-reducers
const rootReducer = combineReducers({
	session,
	sessionErrors,

	ratings,
	suggestions,

	likes,
	pins,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
