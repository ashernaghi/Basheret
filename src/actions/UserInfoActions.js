import * as firebase from 'firebase';
import { USER_INFO_UPDATE_SUCCESS, FETCH_USER_SUCCESS } from './types';
import { Location, Permissions } from 'expo';

export const userInfoUpdateSuccess = (category, response) => ({
    type: USER_INFO_UPDATE_SUCCESS,
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
    dispatch(userInfoUpdateSuccess(category, answer));
};

export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    user,
});

export const getUser = (props) => dispatch =>  {
    let user = firebase.auth().currentUser;
    console.log('USER', user);
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID);
        userFirebase.once("value")
        .then(snapshot=>{
            if(snapshot.val().initialSetupComplete){
                this._getLocationAsync(dispatch);
                dispatch(fetchUserSuccess(snapshot.val()));
                setTimeout( ()=> props.navigation.navigate('App'), 2000 );
            }
            else{
                props.navigation.navigate('IntroQuestions');
            }
        })
    }
    else{
        props.navigation.navigate('Onboarding');
    }
}

_getLocationAsync = async (dispatch) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(updateUserInfo('location', null));
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      dispatch(updateUserInfo('location', location.coords));
    }
  };

//Fetches user info from fb
// export const getUserInfo = (category) => next  => {
// 	let user = firebase.auth().currentUser;
// 	let userID = user.uid;
// 	let ret = "";
// 	let userFirebase = firebase.database().ref('/users/'+userID);
//     userFirebase.child(category).on("value", function(snapshot) {
//     	ret = snapshot.val();
//     })
//     console.log('userfirebase:', userFirebase);
//     return ret;
// }