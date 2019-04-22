import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
  apiKey: "AIzaSyAm30EwOyTZMbhBE1MG2uuREC6g_fpBfPg",
  authDomain: "fblogintest-18329.firebaseapp.com",
  databaseURL: "https://fblogintest-18329.firebaseio.com",
  projectId: "fblogintest-18329",
  storageBucket: "fblogintest-18329.appspot.com",
  messagingSenderId: "353397681207"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
