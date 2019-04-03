import * as firebase from 'firebase';

export const userMatchUpdateSuccess = (category) => ({
    type: USER_MATCH_UPDATE_SUCCESS,
    category
});

//Updates the user's information in the database: 
export const addMatch = (category, matchID) => dispatch =>{
    console.log("adding match");
    let user = firebase.auth().currentUser;
	let userID = user.uid;
	let userCategoryRef = firebase.database().ref('/users/'+userID+"/"+category);
    userCategoryRef.push().set({id: matchID});
    dispatch(userMatchUpdateSuccess(category));
};

export const removeMatch = (category, matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/"+category);
    userCategoryRef.orderByChild('id').equalTo(matchID).on("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data) {
            console.log(data.key);
        });
    });
};

export const getMatches = (category) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/"+category);
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