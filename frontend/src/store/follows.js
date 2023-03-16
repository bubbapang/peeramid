import jwtFetch from "./jwt";

export const RECEIVE_FOLLOW = `follows/RECEIVE_FOLLOW`;
export const REMOVE_FOLLOW = `follows/RECEIVE_FOLLOW`;

export const receiveFollow = (userId) => {
    return {
        type: RECEIVE_FOLLOW,
        userId
    }
}

export const removeFollow = (userId) => {
    return {
        type: REMOVE_FOLLOW,
        userId
    }
}

export const getFollows = (userId) => (store) => {
    return store.users[userId] ? store.users[userId].followers : []
}

export const getFollowing = (userId) => (store) => {
    return store.users[userId] ? store.users[userId].following : []
}

export const createFollow = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/follow`, {
        method: 'POST'
    });

    if (response.ok) {
        dispatch(receiveFollow(userId));
    }
}

// Implement after creating Unfollow route
export const deleteFollow = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/${userId}/follow`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeFollow(userId));
    }
}

export const approveFollow = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/approve/${userId}`, {
        method: 'POST'
    });

    if (response.ok) {
        dispatch(receiveFollow(userId));
    }
}

export const deleteFollowRequest = (userId) => async (dispatch) => {
    const response = await jwtFetch(`/api/users/delete/${userId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeFollow(userId));
    }
}