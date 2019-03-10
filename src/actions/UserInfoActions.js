import * as firebase from 'firebase';
import { USER_INFO_UPDATE } from './types';

export const userInfoUpdate = (category, response) => ({
    type: USER_INFO_UPDATE,
    category,
    response
});

//Updates the user's information in the database: 
export const updateUserInfo = (category, answer) => dispatch =>{
    //QUESTION: these arent async?...
    let user = firebase.auth().currentUser;
	let userID = user.uid;
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.child(category).set(answer);
    dispatch(userInfoUpdate(category, answer));
};

//Fetches user info from fb
export const getUserInfo = (category) => dispatch => {
	let user = firebase.auth().currentUser;
	let userID = user.uid;
	let ret = "";
	let userFirebase = firebase.database().ref('/users/'+userID);
    userFirebase.child(category).on("value", function(snapshot) {
    	ret = snapshot.val();
    })
    console.log('RET IS', ret);
    return ret;
}