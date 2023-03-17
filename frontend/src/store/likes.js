import jwtFetch from "./jwt";

export const RECEIVE_LIKES = `likes/RECEIVE_LIKES`;
export const RECEIVE_LIKE = `likes/RECEIVE_LIKE`;
export const REMOVE_LIKE = `likes/REMOVE_LIKE`;

export const receiveLikes = (userId) => {
    return {
        type: RECEIVE_LIKES,
        userId
    }
}

export const receiveLike = (suggestionId) => {
    return {
        type: RECEIVE_LIKE,
        suggestionId
    }
}

export const removeLike = (suggestionId) => {
    return {
        type: REMOVE_LIKE,
        suggestionId
    }
}

export const getLikes = (userId) => (store) => {
    return store.users[userId] ? store.users[userId].likes : []
}

export const fetchLikes = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/likes`);

    if (response.ok) {
        dispatch(receiveLikes(userId));
    }
}

export const createLike = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/like`);

    if (response.ok) {
        dispatch(receiveLike(suggestionId));
    }
}

export const deleteLike = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/like`);

    if (response.ok) {
        dispatch(removeLike(suggestionId));
    }
}