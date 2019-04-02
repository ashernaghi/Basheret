import * as firebase from 'firebase';
import { USER_INFO_UPDATE_SUCCESS, FETCH_USER_SUCCESS } from './types';
import { Location, Permissions } from 'expo';

export const userInfoUpdateSuccess = (category, subcategory, response) => ({
    type: USER_INFO_UPDATE_SUCCESS,
    subcategory,
    response,
    category
});

//Updates the user's information in the database: 
export const updateUserInfo = (category='', subcategory='', response) => dispatch =>{
    //QUESTION: these arent async?...
    let user = firebase.auth().currentUser;
	let userID = user.uid;
    let userFirebase = firebase.database().ref(`/users/${userID}/${category}`);
    if(subcategory){
        userFirebase.child(subcategory).set(response);
    }
    else{
        userFirebase.set(response);
    }
    dispatch(userInfoUpdateSuccess(category, subcategory, response));
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
                console.log('1.ASKING LOCATION')
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
    console.log('2. GETTING LOCATION')
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(updateUserInfo('location', null, null));
    }
    else{
      let location = await Location.getCurrentPositionAsync({});
      dispatch(updateUserInfo('location', null, location.coords));
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