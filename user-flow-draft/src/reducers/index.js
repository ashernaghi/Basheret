import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfoReducer';

export default combineReducers({
  userInfo: UserInfoReducer,
});
