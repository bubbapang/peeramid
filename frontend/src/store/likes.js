import jwtFetch from "./jwt";

export const RECEIVE_LIKES = `likes/RECEIVE_LIKES`;
export const RECEIVE_LIKE = `likes/RECEIVE_LIKE`;
export const REMOVE_LIKE = `likes/REMOVE_LIKE`;

export const receiveLikes = (suggestions) => {
	return {
		type: RECEIVE_LIKES,
		suggestions,
	};
};

export const receiveLike = (suggestion, userId) => {
	return {
		type: RECEIVE_LIKE,
		suggestion,
		userId,
	};
};

export const removeLike = (suggestionId) => {
	return {
		type: REMOVE_LIKE,
		suggestionId,
	};
};

export const getLikes = (userId) => (store) => {
	return store.users[userId] ? store.users[userId].likes : [];
};

export const fetchLikes = (userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/users/${userId}/likes`);

	if (response.ok) {
		const likes = await response.json();
		dispatch(receiveLikes(likes));
	}
};

export const createLike = (suggestion, userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${suggestion._id}/like`, {
		method: "POST",
	});

	if (response.ok) {
		dispatch(receiveLike(suggestion, userId));
	}
};

export const deleteLike = (suggestionId) => async (dispatch) => {
	const response = await jwtFetch(`/api/suggestions/${suggestionId}/like`, {
		method: "DELETE",
	});

	if (response.ok) {
		dispatch(removeLike(suggestionId));
	}
};

const likesReducer = (oldState = {}, action) => {
	let newState = { ...oldState };

	switch (action.type) {
		case RECEIVE_LIKES:
			action.suggestions.forEach((sugg) => {
				newState[sugg._id] = sugg;
			});
			return newState;

		case RECEIVE_LIKE:
			// newState[userId] = newState[userId] || { pins: [] };
			// newState[userId].pins.push(suggestionId);

			const { suggestion } = action;
			newState[suggestion._id] = suggestion;
			return newState;

		case REMOVE_LIKE:
			delete newState[action.suggestionId];
			// delete newState.session.user.pins
			return newState;

		default:
			return oldState;
	}
};

export default likesReducer;
