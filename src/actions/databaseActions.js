import { USER_INFO_UPDATE } from './types';
import * as firebase from 'firebase';

export const updateUserInfo = (category, answer) => next => {
	let user = firebase.auth().currentUser;
	let userID = user.uid;
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.child(category).set(answer);
    console.log("testing", getUserInfo("denomination"));
};

export const getUserInfo = (category) => next => {
	let user = firebase.auth().currentUser;
	let userID = user.uid;
	var ret = "";
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.child(category).on("value", function(snapshot) {
    	ret = snapshot.val();
    })
    return ret;
}

export const getUser = () => {
	let user = firebase.auth().currentUser;
	let userID = user.uid;
	var ret = "";
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.on("value", function(snapshot) {
    	ret = snapshot.val();
    })
    return ret;
}