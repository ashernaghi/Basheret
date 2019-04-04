import * as firebase from 'firebase';

export const userMatchUpdateSuccess = (category) => ({
    type: USER_MATCH_UPDATE_SUCCESS,
    category
});

//Categories should be matches, potential, and never. In the future there will be a function to check this.

//Creates/updates the match category that the matching user belongs to
export const addMatch = (category, matchID) => dispatch =>{
    console.log("added"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.set({group: category});
    dispatch(userMatchUpdateSuccess(category));
};

//Remove the cooresponding category a user is in
export const removeMatch = (category, matchID) => dispatch =>{
    console.log("removing"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.remove();
};

//Returns a list of User IDs for the cooresponding category
export const getMatches = (category) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/matches");
        userFirebase.orderByChild("group").equalTo(category).on("value", 
            function(snapshot) {
               console.log(snapshot);
               let matches = new Array();
                snapshot.forEach(value=>{
                    matches.push(value.key);
                });
                return matches;
        });
    }
    else{
        props.navigation.navigate('Onboarding');
    }
}


