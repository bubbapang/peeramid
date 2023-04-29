export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveErrors = (errors) => ({
	type: RECEIVE_SESSION_ERRORS,
	errors,
});

export const clearSessionErrors = () => ({
	type: CLEAR_SESSION_ERRORS,
});

const sessionErrorsReducer = (state = null, action) => {
	switch (action.type) {
		case "RECEIVE_SESSION_ERRORS":
			// return the action's payload (error object) or null if it's undefined
			return action.errors || null;
		case "CLEAR_SESSION_ERRORS":
			return null;
		default:
			return state;
	}
};

export default sessionErrorsReducer;
