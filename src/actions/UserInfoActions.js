import * as firebase from 'firebase';
import { USER_INFO_UPDATE_SUCCESS, FETCH_USER_SUCCESS } from './types';
import { Location, Permissions } from 'expo';

export const userInfoUpdateSuccess = (subcategory, response, category) => ({
    type: USER_INFO_UPDATE_SUCCESS,
    subcategory,
    response,
    category
});

//Updates the user's information in the database: 
export const updateUserInfo = (subcategory, answer, category='') => dispatch =>{
    //QUESTION: these arent async?...
    let user = firebase.auth().currentUser;
	let userID = user.uid;
	let userFirebase = firebase.database().ref(`/users/${userID}/${category}`);
    userFirebase.child(subcategory).set(answer);
    dispatch(userInfoUpdateSuccess(subcategory, answer, category));
};

export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    user,
});

export const getUser = (props) => dispatch =>  {
    let user = firebase.auth().currentUser;
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
      dispatch(updateUserInfo('location', null, 'info'));
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      dispatch(updateUserInfo('location', location.coords, 'info'));
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