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
  fullName: '',
  firstName: '',
  lastName: '',
  profilePhoto: '',
  gender: '',
  discoverable: true,
  denominationPreference: [0, 100],
  shabbatPreference: [0, 100],
  kashrutPreference: [0, 100],
  agePreference: [18, 39],
  distancePreference: 1000,
  location: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO_UPDATE:
      return Object.assign({}, state, {
        [action.category]: action.response,
      });
    case LOGIN_FACEBOOK_SUCCESS:
      return Object.assign({}, state, {
        fullName: action.user.additionalUserInfo.profile.name,
        firstName: action.user.additionalUserInfo.profile.first_name,
        lastName: action.user.additionalUserInfo.profile.last_name
      });
    default:
      return state;
  }
};
