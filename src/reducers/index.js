import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfoReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  userInfo: UserInfoReducer,
});
