import jwtFetch from "./jwt";

export const RECEIVE_RATINGS = `suggestions/RECEIVE_RATINGS`;
export const RECEIVE_RATING = `suggestions/RECEIVE_RATING`;
export const REMOVE_RATING = `suggestions/REMOVE_RATING`;

export const receiveRatings = (ratings) => {
    return {
        type: RECEIVE_RATINGS,
        ratings
    }
}

export const receiveRating = (rating) => {
    return {
        type: RECEIVE_RATING,
        rating
    }
}

export const removeRating = (ratingId) => {
    return {
        type: REMOVE_RATING,
        ratingId
    }
}

export const getRatings = (store) => {
    return store.ratings ? Object.values(store.ratings) : [];
}

export const getRating = (ratingId) => (store) => {
    return store.ratings ? store.ratings[ratingId] : null;
}

export const fetchPublicRatings = () => async (dispatch) => {
    const response = await jwtFetch(`/api/ratings/public`);

    if (response.ok) {
        const ratings = await response.json();
        dispatch(receiveRatings(ratings));
    }
}

export const fetchFollowingRatings = () => async (dispatch) => {
    const response = await jwtFetch(`/api/ratings/following`);

    if (response.ok) {
        const ratings = await response.json();
        dispatch(receiveRatings(ratings));
    }
}

export const fetchUserRatings = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/ratings`);

    if (response.ok) {
        const ratings = await response.json();
        dispatch(receiveRatings(ratings));
    }
}

export const createRating = (rating) => async (dispatch) => {
    const response = await jwtFetch(`/api/ratings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(rating)
    });

    if (response.ok) {
        const newRating = await response.json();
        dispatch(receiveRating(newRating));
    }
}

export const updateRating = (rating) => async (dispatch) => {
    const response = await jwtFetch(`/api/ratings/${rating.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(rating)
    });

    if (response.ok) {
        const newRating = await response.json();
        dispatch(receiveRating(newRating));
    }
}

export const deleteRating = (ratingId) => async (dispatch) => {
    const response = await jwtFetch(`/api/ratings/${ratingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeRating(ratingId));
    }
}

let initialState = {};
const ratingsReducer = (oldState = initialState, action ) => {

    const nextState = { ...oldState};

    switch (action.type) {
        case RECEIVE_RATINGS:
            const ratings = action.ratings
            return ratings
        case RECEIVE_RATING:
            nextState[action.rating.id] = action.rating
            return nextState
        // case REMOVE_RATING:
        //     const ratingId = action.ratingId
        //     delete nextState[ratingId]
        //     return nextState
        case REMOVE_RATING:
            const ratingId = action.ratingId;
            let newState = {};
            Object.values(nextState).forEach(rating => {
                newState[rating._id] = rating
            });
            delete newState[ratingId];
            return Object.values(newState);
        default: 
            return oldState;
    }
}
export default ratingsReducer;