import jwtFetch from "./jwt";
import { receiveErrors } from "./sessionErrors";

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
const RECEIVE_SEARCH_RESULTS = "session/RECEIVE_SEARCH_RESULTS";

const SET_TARGET_USER = "session/SET_TARGET_USER";
const CLEAR_TARGET_USER = "session/CLEAR_TARGET_USER";
const SET_RATED_TODAY = "session/SET_RATED_TODAY";
const ADD_USER_PIN = "users/ADD_USER_PIN";

// Action creators, "private"

const logoutUser = () => ({
	type: RECEIVE_USER_LOGOUT,
});

const receiveCurrentUser = (currentUser) => ({
	type: RECEIVE_CURRENT_USER,
	currentUser,
});

// helper method for signup and login
const startSession = (userInfo, route) => async (dispatch) => {
	try {
		const res = await jwtFetch(route, {
			method: "POST",
			body: JSON.stringify(userInfo),
		});
		const { user, token } = await res.json();
		localStorage.setItem("jwtToken", token);
		return dispatch(receiveCurrentUser(user));
	} catch (err) {
		const res = await err.json();
		if (res.statusCode === 400) {
			return dispatch(receiveErrors(res.errors));
		}
	}
};

// Action creators, "public"

// frontend, exported actions

export const setTargetUser = (targetUser) => ({
	type: SET_TARGET_USER,
	targetUser,
});

export const clearTargetUser = () => ({
	type: CLEAR_TARGET_USER,
});

export const receiveSearchResults = (searchResults) => ({
	type: RECEIVE_SEARCH_RESULTS,
	searchResults,
});

export const setRatedToday = (ratedToday) => ({
	type: SET_RATED_TODAY,
	ratedToday,
});

export const addUserPin = (suggestionId, userId) => {
	return {
		type: ADD_USER_PIN,
		suggestionId,
		userId,
	};
};

// exported session actions based on api path
export const signup = (user) => startSession(user, "/api/user-authentication/register");
export const login = (user) => startSession(user, "/api/user-authentication/login");

export const logout = () => (dispatch) => {
	localStorage.removeItem("jwtToken");
	dispatch(logoutUser());
};

export const getCurrentUser = () => async (dispatch) => {
	const res = await jwtFetch("/api/user-data/current");
	const user = await res.json();
	return dispatch(receiveCurrentUser(user));
};

export const searchUsers = (searchTerm) => async (dispatch) => {
	const response = await fetch(`/api/user-data/search?q=${searchTerm}`);

	if (response.ok) {
		const searchResults = await response.json();
		dispatch(receiveSearchResults(searchResults));
	}
};

const initialState = {
	user: undefined,
	targetUser: undefined,
	searchResults: [],
};

function sessionReducer(state = initialState, action) {
	switch (action.type) {
		// follow stuff
		// case RECEIVE_FOLLOW:
		// 	return {
		// 		...state,
		// 		user: {
		// 			...state.user,
		// 			following: [...state.user.following, action.userId],
		// 		},
		// 	};

		// case REMOVE_FOLLOW:
		// 	return {
		// 		...state,
		// 		user: {
		// 			...state.user,
		// 			following: state.user.following.filter(
		// 				(id) => id !== action.userId
		// 			),
		// 		},
		// 	};

		// receiving
		case RECEIVE_CURRENT_USER:
			return { ...state, user: action.currentUser };
		case RECEIVE_USER_LOGOUT:
			return initialState;
		case RECEIVE_SEARCH_RESULTS:
			return { ...state, searchResults: action.searchResults };

		case CLEAR_TARGET_USER:
			return { ...state, targetUser: undefined };
		// setting
		case SET_TARGET_USER:
			return { ...state, targetUser: action.targetUser };
		case SET_RATED_TODAY:
			return { ...state, ratedToday: action.ratedToday };

		// adding
		case ADD_USER_PIN:
			state[action.userId].pins.push(action.suggestionId);
			return state;

		// default
		default:
			return state;
	}
}

export default sessionReducer;
