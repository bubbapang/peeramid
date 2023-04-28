import jwtFetch from "./jwt";

const RECEIVE_SUGGESTIONS = `suggestions/RECEIVE_SUGGESTIONS`;
const RECEIVE_SUGGESTION = `suggestions/RECEIVE_SUGGESTION`;
const REMOVE_SUGGESTION = `suggestions/REMOVE_SUGGESTION`;

export const receiveSuggestions = (suggestions) => {
	return {
		type: RECEIVE_SUGGESTIONS,
		suggestions,
	};
};

export const receiveSuggestion = (suggestion) => {
	return {
		type: RECEIVE_SUGGESTION,
		suggestion,
	};
};

export const removeSuggestion = (suggestionId) => {
	return {
		type: REMOVE_SUGGESTION,
		suggestionId,
	};
};

// helper functions

export const getAllSuggestions = (store) => {
	return store.suggestions ? Object.values(store.suggestions) : [];
};

export const getSuggestion = (suggestionId) => (store) => {
	return store.suggestions ? store.suggestions[suggestionId] : null;
};

// thunk action creators

export const fetchUserSuggestions = (userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/user-data/${userId}/suggestions`);

	if (response.ok) {
		const suggestions = await response.json();
		dispatch(receiveSuggestions(suggestions));
	}
};

export const fetchCategorySuggestions = (category) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${category}`);

	if (response.ok) {
		const suggestions = await response.json();
		dispatch(receiveSuggestions(suggestions));
	}
};

export const fetchAllPublicSuggestions = () => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/`);

	if (response.ok) {
		const suggestions = await response.json();
		dispatch(receiveSuggestions(suggestions));
	}
};

export const createSuggestion = (suggestion, ratingId) => async (dispatch) => {
	const response = await jwtFetch(`/api/ratings/${ratingId}/suggestions`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(suggestion),
	});

	if (response.ok) {
		const newSuggestion = await response.json();
		dispatch(receiveSuggestion(newSuggestion));
	}
};

export const updateSuggestion = (suggestion) => async () => {
	await jwtFetch(`/api/suggestions/${suggestion._id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(suggestion),
	});

	// if (response.ok) {
	// 	const newSuggestion = await response.json();
	// 	dispatch(receiveSuggestion(newSuggestion));
	// }
};

export const deleteSuggestion = (suggestionId) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${suggestionId}`, {
		method: "DELETE",
	});

	if (response.ok) {
		dispatch(removeSuggestion(suggestionId));
	}
};

const suggestionsReducer = (oldState = {}, action) => {
	let nextState = { ...oldState };

	switch (action.type) {
		case RECEIVE_SUGGESTIONS:
			return action.suggestions;
		case RECEIVE_SUGGESTION:
			nextState[action.suggestion._id] = action.suggestion;
			return nextState;
		case REMOVE_SUGGESTION:
			const suggestionId = action.suggestionId;
			let newState = {};
			Object.values(nextState).forEach((suggestion) => {
				newState[suggestion._id] = suggestion;
			});

			delete newState[suggestionId];
			return Object.values(newState);
		default:
			return oldState;
	}
};

export default suggestionsReducer;
