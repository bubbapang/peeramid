import jwtFetch from "./jwt";

export const RECEIVE_PINS = `pins/RECEIVE_PINS`;
export const RECEIVE_PIN = `pins/RECEIVE_PIN`;
export const REMOVE_PIN = `pins/REMOVE_PIN`;

export const receivePins = (userId) => {
    return {
        type: RECEIVE_PINS,
        userId
    }
}

export const receivePin = (suggestionId) => {
    return {
        type: RECEIVE_PIN,
        suggestionId
    }
}

export const removePin = (suggestionId) => {
    return {
        type: REMOVE_PIN,
        suggestionId
    }
}

export const getPins = (userId) => (store) => {
    return store.users[userId] ? store.users[userId].pins : []
}

export const fetchPins = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/pins`);

    if (response.ok) {
        dispatch(receivePins(userId));
    }
}

export const createPin = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/pins`);

    if (response.ok) {
        dispatch(receivePin(suggestionId));
    }
}

export const deletePin = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/pins`);

    if (response.ok) {
        dispatch(removePin(suggestionId));
    }
}