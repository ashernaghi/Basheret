import * as firebase from 'firebase';
import { USER_MATCH_UPDATE_SUCCESS, GET_MATCHES_SUCCESS } from './types';

export const userMatchUpdateSuccess = (category, matchId) => ({
    type: USER_MATCH_UPDATE_SUCCESS,
    category,
    matchId
});

//Remove the cooresponding category a user is in
export const removeMatch = (category, matchID) => dispatch =>{
    console.log("removing"+category+matchID);
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.remove();
};

export const getMatchesSuccess = (matches) => ({
    type: GET_MATCHES_SUCCESS,
    matches,
});

//Returns a list of User IDs for the cooresponding category - not currently using this since all the matches come in with user on load
export const getMatches = (category) => dispatch =>  {
    let user = firebase.auth().currentUser;
    if(user){
        let userID = user.uid;
        let userFirebase = firebase.database().ref('/users/'+userID+"/matches");
        userFirebase.orderByChild("group").equalTo(category).on("value", 
            function(snapshot) {
               let matches = new Array();
                snapshot.forEach(value=>{
                    matches.push(value.key);
                });
            getMatchesSuccess(matches)
        });
    }
}

//Creates/updates the match category that the matching user belongs to
export const addMatch = (category, matchID) => dispatch =>{
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    let userCategoryRef = firebase.database().ref('/users/'+userID+"/matches/"+matchID);
    userCategoryRef.set({group: category});
    dispatch(userMatchUpdateSuccess(category, matchID));
};

//Get next candidate, returns the id for the next candidate that isn't the same gender and isn't already in your matches. 
//Return empty string if none. 
export const getCandidate = () => dispatch => {
    let user = firebase.auth().currentUser;
    let userID = user.uid;
    firebase.database().ref('/users/'+userID+'/info').on('value', function(snapshot) {
        let userGender =  snapshot.gender;
        let userCategoryRef = firebase.database().ref('/users/');
        let priorMatches = new Array();
        priorMatches.push(addMatch('matches'));
        userCategoryRef.on("value",
            function(snapshot) {
                snapshot.forEach(value=>{
                    if (!priorMatches.includes(value.key)) {
                        if (userGender != value.info.gender) {
                            return value.key;
                        }
                    }
                });
                return '';
            }
        )
    });
}

//right now these fns are just adding/removing from a single user's account. needs to happen across two accounts (user and candidate)

//Categories should be matches, potential, and never. In the future there will be a function to check this.