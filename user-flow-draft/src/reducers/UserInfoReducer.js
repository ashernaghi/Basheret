import {
  USER_INFO_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  denomination: '',
  shabbatObservance: '',
  kashrutLevel: '',
  city: '',
  bio: '',
  education: '',
  highSchool: '',  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO_UPDATE:
      return Object.assign({}, state, {
        [action.category]: action.answer,
      });
    default:
      return state;
  }
};
