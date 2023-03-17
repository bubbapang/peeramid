import jwtFetch from './jwt';
import { RECEIVE_PIN } from './pins';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_SEARCH_RESULTS = 'users/RECEIVE_SEARCH_RESULTS';
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
export const ADD_USER_PIN = "users/ADD_USER_PIN"

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
  
// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const receiveSearchResults = (results) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results,
  };
};

export const addUserPin = (suggestionId, userId) => {
  return {
    type: ADD_USER_PIN,
    suggestionId,
    userId,
  };
};

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};

const startSession = (userInfo, route) => async dispatch => {
    try {  
      const res = await jwtFetch(route, {
        method: "POST",
        body: JSON.stringify(userInfo)
      });
      const { user, token } = await res.json();
      localStorage.setItem('jwtToken', token);
      return dispatch(receiveCurrentUser(user));
    } catch(err) {
      const res = await err.json();
      if (res.statusCode === 400) {
        return dispatch(receiveErrors(res.errors));
      }
    }
  };

  export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
  };

  const initialState = {
    user: undefined
  };
  
export const searchUsers = (searchTerm) => async (dispatch) => {

    const response = await fetch(`/api/users/search?q=${searchTerm}`);

    if (response.ok) {
      const searchResults = await response.json();
      dispatch(receiveSearchResults(searchResults));
    }

  
};
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return { user: action.currentUser };
      case RECEIVE_USER_LOGOUT:
        return initialState;
      case ADD_USER_PIN:
        state[action.userId].pins.push(action.suggestionId);
        return state;
      case RECEIVE_SEARCH_RESULTS:
        return {...state, searchResults: action.results }
      default:
        return state;
    }
  };
  
  const nullErrors = null;

    export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
          return action.errors;
        case RECEIVE_CURRENT_USER:
          
        case CLEAR_SESSION_ERRORS:
          return nullErrors;
        default:
          return state;
    }
    };

    

    export default sessionReducer;
