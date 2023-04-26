import jwtFetch from "./jwt";

export const RECEIVE_PINS = `pins/RECEIVE_PINS`;
export const RECEIVE_PIN = `pins/RECEIVE_PIN`;
export const REMOVE_PIN = `pins/REMOVE_PIN`;

export const receivePins = (suggestions) => ({
	type: RECEIVE_PINS,
	suggestions,
});

export const receivePin = (suggestion, userId) => ({
	type: RECEIVE_PIN,
	suggestion,
	userId,
});

export const removePin = (suggestionId) => ({
	type: REMOVE_PIN,
	suggestionId,
});

// helper functions

export const getUserPins = () => (store) =>
	store.session.user ? store.session.user.pins : [];

export const getTargetPins = (store) =>
	store.session.targetUser ? store.session.targetUser.pins : [];

// thunk action creators

export const fetchPins = (userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/user-data/${userId}/pins`);

	if (response.ok) {
		const pins = await response.json();
		dispatch(receivePins(pins));
	}
};

export const createPin = (suggestion, userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${suggestion._id}/pin`, {
		method: "POST",
	});

	if (response.ok) {
		dispatch(receivePin(suggestion, userId));
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

export const deleteTargetUserPin = (suggestionId) => async (dispatch) => {
	// const response = await jwtFetch(`/api/suggestions/${suggestionId}/pin`, {
	// 	method: "DELETE",
	// });
};

// const initialState = {};
// const pinsReducer = (state = initialState, action = {}) => {
// 	switch (action.type) {
// 		case RECEIVE_PINS:
// 			return action.pins;
// 		case RECEIVE_PIN:
// 			return { ...state, [action.pin._id]: action.pin };
// 		case REMOVE_PIN:
// 			const newState = { ...state };
// 			delete newState[action.pinId];
// 			return newState;
// 		default:
// 			return state;
// 	}
// };

const pinsReducer = (oldState = {}, action) => {
	let newState = { ...oldState };

	switch (action.type) {
		case RECEIVE_PINS:
			newState = {};
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
