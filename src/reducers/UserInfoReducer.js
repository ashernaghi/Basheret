import {
  USER_INFO_UPDATE_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
  FETCH_USER_SUCCESS,
  USER_MATCH_UPDATE_SUCCESS,
  GET_ANOTHER_USER_SUCCESS,
  GET_MATCHES_SUCCESS,
  DELETE_ALL_MATCHES,
  SHOW_PROFILE_SCREEN
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
    case DELETE_ALL_MATCHES:
      console.log('USER WILL NOW BE', {
        ...state.user,
        'matchesCards': []
      })
      return Object.assign({}, state, {
        user: {
          ...state.user,
          'matchesCards': []
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
    case SHOW_PROFILE_SCREEN:
    //if theres an id, then user is trying to view the profile of one of their  mutual matches, so change the candidate to that user
      if(action.card){
        return Object.assign({}, state, {
          user: {
            ...state.user,
            [action.category]: action.card,
        }
      });
      }
    default:
      return state;
  }
};
