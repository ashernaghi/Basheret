import {
  MUTUAL_MATCH_SCREEN,
} from '../actions/types';

const INITIAL_STATE = {
  showMutualMatchScreen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MUTUAL_MATCH_SCREEN:
      return Object.assign({}, state, {
        showMutualMatchScreen: action.bool,
      });
    default:
      return state;
  }
};
