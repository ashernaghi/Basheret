import {
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_ERROR,
  LOGIN_PHONE_NUMBER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: null,
  loggingIn: false, 
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FACEBOOK_REQUEST:
      return Object.assign({}, state, {
        loggingIn: true,
        error: null,
      });
    case LOGIN_FACEBOOK_SUCCESS:
      return Object.assign({}, state, {
        loggingIn: false,
        error: null,
        user: action.user
      });
    case LOGIN_PHONE_NUMBER_SUCCESS: 
      return Object.assign({}, state, {
        loggingIn: false,
        error: null,
        user: action.user
      })  
    case LOGIN_FACEBOOK_ERROR:
      return Object.assign({}, state, {
        loggingIn: false,
        error: action.error,
      });
    default:
      return state;
  }
};
