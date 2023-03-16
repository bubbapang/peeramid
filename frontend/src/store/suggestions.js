import jwtFetch from "./jwt";

export const RECEIVE_SUGGESTIONS = `suggestions/RECEIVE_SUGGESTIONS`;
export const RECEIVE_SUGGESTION = `suggestions/RECEIVE_SUGGESTION`;
export const REMOVE_SUGGESTION = `suggestions/REMOVE_SUGGESTION`;

export const receiveSuggestions = (suggestions) => {
    return {
        type: RECEIVE_SUGGESTIONS,
        suggestions
    }
}

export const receiveSuggestion = (suggestion) => {
    return {
        type: RECEIVE_SUGGESTION,
        suggestion
    }
}

export const removeSuggestion = (suggestionId) => {
    return {
        type: REMOVE_SUGGESTION,
        suggestionId
    }
}

export const getSuggestions = (store) => {
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

export const createSuggestion = (suggestion, ratingId) => async (dispatch) => {
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
    const response = await jwtFetch(`/api/suggestions/${suggestion.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(suggestion)
    });

    if (response.ok) {
        const newSuggestion = await response.json();
        dispatch(receiveSuggestion(newSuggestion));
    }
}

export const deleteSuggestion = (suggestionId) => async (dispatch) => {
    const response = await jwtFetch(`/api/suggestions/${suggestionId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeSuggestion(suggestionId));
    }
}

let initialState = {};
export const suggestionsReducer = (oldState = initialState, action) => {
    const nextState = {...oldState};

    switch (action.type) {
        case RECEIVE_SUGGESTIONS:
            break;
        case RECEIVE_SUGGESTION:
            break;
        case REMOVE_SUGGESTION:
            break;
        default:
            return oldState;
    }
}