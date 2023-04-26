import jwtFetch from "./jwt";

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

export const receiveLikes = (likes) => {
	return {
		type: RECEIVE_LIKES,
		likes,
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

// helper functions

export const getLikes = (userId) => (store) => {
	return store.users[userId] ? store.users[userId].likes : [];
};

// thunk action creators

export const fetchLikes = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/user-data/${userId}/likes`);
    if (response.ok) {
        const likes = await response.json();
        dispatch(receiveLikes(likes));
    }
};

export const createLike = (suggestion, userId) => async (dispatch) => {
	const response = await jwtFetch(`/api/likes/${suggestion._id}/like`, {
		method: "POST",
	});

	if (response.ok) {
		dispatch(receiveLike(suggestion, userId));
	}
};

export const deleteLike = (suggestionId) => async (dispatch) => {
	const response = await jwtFetch(`/api/likes/${suggestionId}/like`, {
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
			action.likes.forEach((like) => {
				newState[like._id] = like;
			});
			return newState;

		case RECEIVE_LIKE:
			const { suggestion } = action;
			newState[suggestion._id] = suggestion;
			return newState;

		case REMOVE_LIKE:
			delete newState[action.suggestionId];
			return newState;

		default:
			return oldState;
	}
};

export default likesReducer;
