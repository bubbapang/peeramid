import jwtFetch from "./jwt";
import { addUserPin } from "./session";
import { useSelector } from "react-redux";
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

export const receivePin = (suggestionId, userId) => {
    return {
        type: RECEIVE_PIN,
        suggestionId,
        userId
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

export const createPin = (suggestionId, userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/pin`, {
        method: "POST"
        // headers: {"Content-type": "application/json"},
        // body: JSON.stringify(suggestionId)
    });
    if (response.ok) {
        // const userId = useSelector(state => state.session.user._id);
        dispatch(receivePin(suggestionId, userId));
        // dispatch(addUserPin(suggestionId, userId)); 
    }
}

export const deletePin = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}/pin`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removePin(suggestionId));
    }
}



const pinsReducer = (oldState={}, action) => {

    const nextState = {...oldState}

    switch(action.type) {
        case RECEIVE_PINS:
            return action.suggestions;
        case RECEIVE_PIN:
            const { suggestionId, userId } = action;
            nextState[userId] = nextState[userId] || { pins: [] };
            nextState[userId].pins.push(suggestionId);
            return nextState;
        case REMOVE_PIN:
            console.log(nextState)
            delete nextState[action.suggestionId]
            // delete nextState.session.user.pins
            return nextState;
        default:
            return oldState
    }
}

export default pinsReducer