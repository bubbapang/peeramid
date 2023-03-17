import jwtFetch from "./jwt";
import { RECEIVE_PIN } from './pins';

export const RECEIVE_SUGGESTIONS = `suggestions/RECEIVE_SUGGESTIONS`;
export const RECEIVE_SUGGESTION = `suggestions/RECEIVE_SUGGESTION`;
export const REMOVE_SUGGESTION = `suggestions/REMOVE_SUGGESTION`;

export const receiveSuggestions = (suggestions) => {
    return ({
        type: RECEIVE_SUGGESTIONS,
        suggestions
    })
}

export const receiveSuggestion = (suggestion) => {
    return ({
        type: RECEIVE_SUGGESTION,
        suggestion
    })
}

export const removeSuggestion = (suggestionId) => {
    return ({
        type: REMOVE_SUGGESTION,
        suggestionId
    })
}

export const getAllSuggestions = (store) => {
    return store.suggestions ? Object.values(store.suggestions) : [];
}

export const getSuggestion = (suggestionId) => (store) => {
    return store.suggestions ? store.suggestions[suggestionId] : null;
}

export const fetchRatingSuggestions = (ratingId) => async (dispatch) => {
    const response = await jwtFetch(`/api/reviews/${ratingId}/suggestions`);

    if (response.ok) {
        const suggestions = await response.json();
        dispatch(receiveSuggestions(suggestions));
    }
}

export const fetchUserSuggestions = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/suggestions`);

    if (response.ok) {
        const suggestions = await response.json();
        dispatch(receiveSuggestions(suggestions));
    }
}

export const fetchCategorySuggestions = (category) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${category}`);

    if (response.ok) {
        const suggestions = await response.json();
        dispatch(receiveSuggestions(suggestions));
    }
}

export const fetchAllPublicSuggestions = () => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/`);

    if (response.ok) {
        const suggestions = await response.json();
        dispatch(receiveSuggestions(suggestions));
    }
}

export const createSuggestion = (suggestion, ratingId) => async (dispatch) => {
    // console.log(suggestion, ratingId);
    const response = await jwtFetch(`/api/ratings/${ratingId}/suggestions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(suggestion)
    });

    if (response.ok) {
        const newSuggestion = await response.json();
        dispatch(receiveSuggestion(newSuggestion));
    }
}

export const updateSuggestion = (suggestion) => async (dispatch) => {
    console.log(suggestion);
    const response = await jwtFetch(`/api/suggestions/${suggestion.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(suggestion)
    });

    if (response.ok) {
        const newSuggestion = await response.json();
        dispatch(receiveSuggestion(newSuggestion));
    }
}

export const deleteSuggestion = (suggestionId) => async (dispatch) => {
    console.log("suggestionID in the deleteSuggestion", suggestionId);
    const response = await jwtFetch(`/api/suggestions/${suggestionId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log("response is ok", response);
        dispatch(removeSuggestion(suggestionId));
    }
}

let initialState = {};
const suggestionsReducer = (oldState = initialState, action) => {
    const nextState = {...oldState};

    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
            return action.suggestions
        case RECEIVE_SUGGESTION:
            nextState[action.suggestion.id] = action.suggestion;
            return nextState;
        case REMOVE_SUGGESTION:
            const suggestionId = action.suggestionId;
            delete nextState[action.suggestionId];
            return nextState;
        // case RECEIVE_PIN:
        //     let suggestions = {}
        //     Object.values(nextState).forEach(suggestion => {
        //         suggestions[suggestions._id] = suggestion
        //     })
        //     console.log(suggestions)
        //     // suggestions[action.suggestionId] = 
        //     return nextState;
        default:
            return oldState;
    }
}

export default suggestionsReducer