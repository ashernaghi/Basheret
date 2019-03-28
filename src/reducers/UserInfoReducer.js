import {
  USER_INFO_UPDATE_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
  FETCH_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    info: {

    },
    preferences: {

    },
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO_UPDATE_SUCCESS:
      console.log('UPDATING', action.subcategory);
      return Object.assign({}, state, {
        user: {
          ...state.user,
          [action.category]: {
            ...state.user[action.category],
            [action.subcategory]: action.response
          }
        }
      });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
    // case LOGIN_FACEBOOK_SUCCESS:
    //   return Object.assign({}, state, {
    //     user: {
    //       ...state.user,
    //       name: action.user.additionalUserInfo.profile.name,
    //     }
    //   });
      // console.log('FB', {
      //   ...state.user,
      //   'info': {
      //     ...state.user['info'],
      //     'name': action.user.additionalUserInfo.profile.name
      //   }
      // })
      // return Object.assign({}, state, {
      //   user: {
      //     ...state.user,
      //     'info': {
      //       ...state.user['info'],
      //       'name': action.user.additionalUserInfo.profile.name
      //     }
      //   }
      // });
    default:
      return state;
  }
};
