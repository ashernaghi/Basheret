import * as firebase from 'firebase';
import { 
  LOGIN_FACEBOOK_REQUEST, 
  LOGIN_FACEBOOK_SUCCESS, 
  LOGIN_FACEBOOK_ERROR } from './types';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAm30EwOyTZMbhBE1MG2uuREC6g_fpBfPg",
  authDomain: "fblogintest-18329.firebaseapp.com",
  databaseURL: "https://fblogintest-18329.firebaseio.com",
  projectId: "fblogintest-18329",
  storageBucket: "fblogintest-18329.appspot.com",
  messagingSenderId: "353397681207"
};

firebase.initializeApp(firebaseConfig);

export const loginFacebookRequest = () => ({
  type: LOGIN_FACEBOOK_REQUEST,
});

export const loginFacebookError = (error) => ({
  type: LOGIN_FACEBOOK_ERROR,
  error
});

export const loginFacebookSuccess = (user) => ({
  type: LOGIN_FACEBOOK_SUCCESS,
  user,
});

export const loginWithFacebook = () => async (dispatch) => {
  dispatch(loginFacebookRequest());

  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
  ('1073829486133421', { permissions: ['public_profile'] })

  if (type === 'success') {
    const credential = firebase.auth.FacebookAuthProvider.credential(token)

    firebase.auth().signInAndRetrieveDataWithCredential(credential)
    .then(user=>{
      console.log('USER', user)
      dispatch(loginFacebookSuccess(user));
      //call another async action that will send the relevant information to the db (full name)
    })
    .catch((error) => {
      dispatch(loginFacebookError(error))
    })
  }
  else{
    //user clicked cancel
    dispatch(loginFacebookError(type))
  }
}