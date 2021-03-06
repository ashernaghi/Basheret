import * as firebase from 'firebase';
import {
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_ERROR,
  LOGIN_PHONE_NUMBER_SUCCESS
} from './types';
import { updateUserInfo } from './UserInfoActions';

export const loginFacebookRequest = () => ({
  type: LOGIN_FACEBOOK_REQUEST,
});

export const loginFacebookError = (error) => ({
  type: LOGIN_FACEBOOK_ERROR,
  error
});

export const loginPhoneNumberSuccess = (user) => ({
  type: LOGIN_PHONE_NUMBER_SUCCESS,
  user,
});

export const loginWithPhoneNumber = (user) => async (dispatch) => {
  dispatch(loginPhoneNumberSuccess(user));
  dispatch(updateUserInfo('info', 'phoneNumber', user.phoneNumber));
}

// export const loginWithFacebook = () => async (dispatch) => {
//   dispatch(loginFacebookRequest());

//   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
//   ('1073829486133421', { permissions: ['public_profile'] })

//   if (type === 'success') {
//     const credential = firebase.auth.FacebookAuthProvider.credential(token)

//     firebase.auth().signInAndRetrieveDataWithCredential(credential)
//     .then(user=>{
//       dispatch(loginFacebookSuccess(user));
//       //take stuff we need from fb and send it off to firebase
//       dispatch(updateUserInfo('info', 'name', user.additionalUserInfo.profile.name));
//     })
//     .catch((error) => {
//       dispatch(loginFacebookError(error))
//     })
//   }
//   else{
//     //user clicked cancel
//     dispatch(loginFacebookError(type))
//   }
// }






