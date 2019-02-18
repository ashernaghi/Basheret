import {
  USER_INFO_UPDATE,
  LOGIN_FACEBOOK_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  denomination: 100,
  shabbatObservance: 100,
  kashrutObservance: 100,
  city: '',
  bio: '',
  education: '',
  highSchool: '',  
  name: '',
  profilePhoto: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO_UPDATE:
      return Object.assign({}, state, {
        [action.category]: action.answer,
      });
    case LOGIN_FACEBOOK_SUCCESS:
      return Object.assign({}, state, {
        name: action.user.additionalUserInfo.profile.name,
        // photo: action.user.user.photoURL
      });
    default:
      return state;
  }
};
