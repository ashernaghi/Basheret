import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfoReducer';
import AuthReducer from './AuthReducer';
import NavReducer from './NavReducer';
import ContactList from './ContactList';

export default combineReducers({
  auth: AuthReducer,
  userInfo: UserInfoReducer,
  nav: NavReducer,
  contact: ContactList
});
