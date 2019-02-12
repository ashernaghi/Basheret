import {
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: null,
  loading: false, 
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FACEBOOK_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOGIN_FACEBOOK_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        user: action.user
      });
    case LOGIN_FACEBOOK_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
};
