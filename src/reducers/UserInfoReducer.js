import {
  USER_INFO_UPDATE_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
  FETCH_USER_SUCCESS,
  USER_MATCH_UPDATE_SUCCESS,
  GET_ANOTHER_USER_SUCCESS,
  GET_MATCHES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    info: {

    },
    preferences: {

    },

    location: { 

    },
    matchesCards: [],
    matches: [],
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
    case GET_MATCHES_SUCCESS:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          matches: action.matches
        }
      });
    case GET_ANOTHER_USER_SUCCESS:  
      if(action.category==='candidate'){
          return Object.assign({}, state, {
            user: {
              ...state.user,
              [action.category]: action.user,
          }
        });
      }
      //category is matches: 
      else{
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
      }
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
    default:
      return state;
  }
};
