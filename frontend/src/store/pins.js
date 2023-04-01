// import { addUserPin } from "./session";
// import { useSelector } from "react-redux";
// import { receiveSuggestions } from "./suggestions";
import jwtFetch from "./jwt";

export const RECEIVE_PINS = `pins/RECEIVE_PINS`;
export const RECEIVE_PIN = `pins/RECEIVE_PIN`;
export const REMOVE_PIN = `pins/REMOVE_PIN`;

export const receivePins = (suggestions) => {
	return {
		type: RECEIVE_PINS,
		suggestions,
	};
};

export const receivePin = (suggestion, userId) => {
	return {
		type: RECEIVE_PIN,
		suggestion,
		userId,
	};
};

export const removePin = (suggestionId) => {
	return {
		type: REMOVE_PIN,
		suggestionId,
	};
};

export const getPins = (userId) => (store) => {
	return store.session.user ? store.session.user.pins : [];
};

export const fetchPins = (user) => async (dispatch) => {
	const response = await jwtFetch(`/api/users/${user._id}/pins`);

	if (response.ok) {
		const pins = await response.json();
		dispatch(receivePins(pins));
	}
};

export const createPin = (suggestion, userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${suggestion._id}/pin`, {
		method: "POST",
		// headers: {"Content-type": "application/json"},
		// body: JSON.stringify(suggestionId)
	});
	if (response.ok) {
		// const userId = useSelector(state => state.session.user._id);
		dispatch(receivePin(suggestion, userId));
		// dispatch(addUserPin(suggestionId, userId));
	}
};

export const deletePin = (suggestionId) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${suggestionId}/pin`, {
		method: "DELETE",
	});

	if (response.ok) {
		dispatch(removePin(suggestionId));
	}
};

const pinsReducer = (oldState = {}, action) => {
	let newState = { ...oldState };

	switch (action.type) {
		case RECEIVE_PINS:
			action.suggestions.forEach((sugg) => {
				newState[sugg._id] = sugg;
			});
			return newState;
		case RECEIVE_PIN:
			// update: removed userId from action because it wasnt being used
			const { suggestion } = action;
			// newState[userId] = newState[userId] || { pins: [] };
			// newState[userId].pins.push(suggestionId);
			newState[suggestion._id] = suggestion;
			return newState;
		case REMOVE_PIN:
			delete newState[action.suggestionId];
			// delete newState.session.user.pins
			return newState;
		default:
			return oldState;
	}
};

export default pinsReducer;
