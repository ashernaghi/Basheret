import {
  MUTUAL_MATCH_SCREEN, SHOW_PROFILE_SCREEN
} from '../actions/types';

const INITIAL_STATE = {
  showMutualMatchScreen: false,
  showProfileScreen: 'self', //can be self or candidate
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MUTUAL_MATCH_SCREEN:
      return Object.assign({}, state, {
        showMutualMatchScreen: action.bool,
      });
    case SHOW_PROFILE_SCREEN:
      console.log('SHOWING', action.category);
      return Object.assign({}, state, {
        showProfileScreen: action.category,
      });
    default:
      return state;
  }
};
