import {
  USER_INFO_UPDATE_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
  FETCH_USER_SUCCESS,
  USER_MATCH_UPDATE_SUCCESS,
  GET_ANOTHER_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    info: {

    },
    preferences: {

    },

    location: { 

    },
    matchesCards: []
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO_UPDATE_SUCCESS:
      if(action.category==='location'){
        return Object.assign({}, state, {
          user: {
            ...state.user,
            [action.category]: action.response
          }
        })
      }
      else{
        return Object.assign({}, state, {
          user: {
            ...state.user,
            [action.category]: {
              ...state.user[action.category],
              [action.subcategory]: action.response
            }
          }
        });
    }
    case GET_ANOTHER_USER_SUCCESS:  
      if(state.user[action.category]){
        return Object.assign({}, state, {
          user: {
            ...state.user,
            [action.category]: [
              ...state.user[action.category],
              action.user
            ]
          }
        });
      }
      else{
        return Object.assign({}, state, {
          user: {
            ...state.user,
            [action.category]: [
              action.user
            ]
          }
        });
      }
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
