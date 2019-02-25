import { USER_INFO_UPDATE } from './types';
import * as firebase from 'firebase';
// firebase.initializeApp(firebaseConfig);

export const updateUserInfo = (category, answer) => {
	let user = firebase.auth().currentUser;
	let userID = user.uid;
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.child(category).set(answer);
};

export const getUserInfo = (category) => {
	let user = firebase.auth().currentUser;
	let userID = user.uid;
	var ret = "";
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.child(category).on("value", function(snapshot) {
    	ret = snapshot.val();
    })
    return ret;
}