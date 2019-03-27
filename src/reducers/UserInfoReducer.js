import {
  USER_INFO_UPDATE_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
  FETCH_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          [action.category]: action.response,
        }
      });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
    case LOGIN_FACEBOOK_SUCCESS:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          fullName: action.user.additionalUserInfo.profile.name,
          firstName: action.user.additionalUserInfo.profile.first_name,
          lastName: action.user.additionalUserInfo.profile.last_name
        }
      });
    default:
      return state;
  }
};
