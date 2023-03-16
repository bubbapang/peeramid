import jwtFetch from "./jwt";
import { receiveSuggestions } from "./suggestions";
export const RECEIVE_PINS = `pins/RECEIVE_PINS`;
export const RECEIVE_PIN = `pins/RECEIVE_PIN`;
export const REMOVE_PIN = `pins/REMOVE_PIN`;

export const receivePins = (suggestions) => {
    return {
        type: RECEIVE_PINS,
        suggestions
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
    return store.users && store.users[userId] ? store.users[userId].pins : []
}

export const fetchPins = (user) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${user._id}/pins`);

    if (response.ok) {
        const pins = await response.json();
        dispatch(receivePins(pins));
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

const pinsReducer = (oldState={}, action) => {

    const nextState = {...oldState}

    switch(action.type) {
        case RECEIVE_PINS:
            return action.suggestions;
        default:
            return oldState
    }
}

export default pinsReducer