import jwtFetch from "./jwt";

export const RECEIVE_DISLIKES = `dislikes/RECEIVE_DISLIKES`;
export const RECEIVE_DISLIKE = `dislikes/RECEIVE_DISLIKE`;
export const REMOVE_DISLIKE = `dislikes/REMOVE_DISLIKE`;

export const receiveDislikes = (userId) => {
    return {
        type: RECEIVE_DISLIKES,
        userId
    }
}

export const receiveDislike = (suggestionId) => {
    return {
        type: RECEIVE_DISLIKE,
        suggestionId
    }
}

export const removeDislike = (suggestionId) => {
    return {
        type: REMOVE_DISLIKE,
        suggestionId
    }
}

export const getDislikes = (userId) => (store) => {
    return store.users[userId] ? store.users[userId].dislikes : []
}

export const fetchDislikes = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/dislikes`);

    if (response.ok) {
        dispatch(receiveDislikes(userId));
    }
}

export const createDislike = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/dislikes`);

    if (response.ok) {
        dispatch(receiveDislike(suggestionId));
    }
}

export const deleteDislike = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/dislikes`);

    if (response.ok) {
        dispatch(removeDislike(suggestionId));
    }
}