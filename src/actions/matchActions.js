import firebase from './firebase';
import { USER_MATCH_UPDATE_SUCCESS, GET_MATCHES_SUCCESS, MUTUAL_MATCH_SCREEN, DELETE_ALL_MATCHES } from './types';
import {getAnotherUser, getAnotherUserSuccess} from './UserInfoActions'
const POSITIVE_MATCH = 'POSITIVE_MATCH';
const NEGATIVE_MATCH = 'NEGATIVE_MATCH';
const MUTUAL_MATCH = 'MUTUAL_MATCH';
const POTENTIAL_MATCH = 'POTENTIAL_MATCH';
const RECCOMENDED_MATCH = 'RECCOMENDED_MATCH';
const RECCOMENDED_POSITIVE_MATCH = 'RECCOMENDED_POSITIVE_MATCH';

export const updateMatches = () => dispatch => {
    console.log("updating matches")
    let userID = firebase.auth().currentUser.uid;
    let userRef = firebase.firestore().collection('users').doc(userID);
    let userInfo = {};
    userRef.get()
    .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
            let preferences =  doc.data().preferences;
            let genderPreference =  doc.data().preferences.genderPreference;
            let lastSignIn = doc.data().lastSignIn;
            firebase.firestore().collection('users').where('info.gender', '==', genderPreference).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    userRef.update(userInfo);
                    return;
                }
                else {
                    snapshot.forEach(match => {
                        console.log('dispatch', match.id, match.data());
                        if (validPotential(doc.data(), match.data())) {
                            getMatchCategory(userRef, match.id)
                            .then(matchCategory => {
                                if (matchCategory == POTENTIAL_MATCH) {
                                    dispatch(updateMatch(userRef, POTENTIAL_MATCH, match.id));
                                }
                            })
                            .catch(err => {
                                console.log('error getting match', err);
                            })
                        }
                    });
                    userRef.update(userInfo);
                }
            })
            .catch(error => {
                console.log('initializing failed', error);
            })
        }
    })
    .catch(error => {
        console.log('initializing outer failed', error);
    })
}

const validPotential = (user, match) => {
    if (!validPreferences(user, match)) {
        return false;
    }
    if (!validPreferences(match, user)) {
        return false;
    }
    if (!match.preferences.discoverable) {
        return false;
    }
    return true;
}

const preferenceList = ['age', 'denomination', 'kashrut', 'shabbat'];

const validPreferences = (userA, userB) => {
    const info = userA.info;
    const preferences = userB.preferences;
    for (const pref of preferenceList) {
        const curPref = pref.concat('Preference')
        if (info[pref] < preferences[curPref][0] || info[pref] > preferences[curPref][1])
            return false;
    }
    if (info.gender != preferences.genderPreference) {
        return false;
    }
    return true;
}

//Use this function when a user rejects a match with another user. Takes the other user's match ID
export const negativeMatch = (matchID) => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    console.log("NEGATIVE_MATCH", userID, matchID);
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let userRef = firebase.firestore().collection('users').doc(userID);
    dispatch(updateMatch(userRef, NEGATIVE_MATCH, userID));
    dispatch(updateMatch(matchRef, NEGATIVE_MATCH, matchID));
}

//Use this function when a user approves a match with another user
//Given a match that the user matched positively with, update the coorepsonding collections and documents
export const positiveMatch = (matchID) => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let userRef = firebase.firestore().collection('users').doc(userID);
    console.log('positiveMatch', matchID);
    getMatchCategory(matchRef, userID)
    .then(matchCategory => {
        console.log('pos match', matchCategory);
        if (matchCategory === POSITIVE_MATCH) {
            dispatch(updateMatch(userRef, MUTUAL_MATCH, matchID));
            dispatch(updateMatch(matchRef, MUTUAL_MATCH, userID));
        }
        else {
            dispatch(updateMatch(userRef, POSITIVE_MATCH, matchID));
            dispatch(updateMatch(matchRef, POTENTIAL_MATCH, userID));
        }
    })
    .catch(error => {
        console.log('error positiveMatch', error);
    })
}


//Return the highest candidate in the potential list.
export const getCandidate = () => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(userID).collection('matches');
    let nextMatch = matchRef.where("category", "==", POTENTIAL_MATCH).orderBy('score').limit(1).onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            if (doc.exists) {
                console.log('found candiddate', doc.id, doc.data());
                dispatch(getAnotherUser(doc.id, 'candidate'))
            }
            else {
                console.log('no matching candidates');
                dispatch(getAnotherUserSuccess(null, 'candidate'))
            }
        });
    })
}

//Get all ids of users currently in the mutual match category
export const getCurrentMatches = () => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(userID).collection('matches');
    console.log('getting matches', userID);
    matchRef.where("category", "==", MUTUAL_MATCH).orderBy("dateAdded", "desc").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //console.log('curMatch',doc.data());
            dispatch(getAnotherUser(doc.id, 'matchesCards'))
        });
    })
    .catch(error => {
        console.log('no matching users', error)
        return;
    })
}

//Matchmaker functions
//Set users to be reccomended matches
export const reccomendedMatch = (otherID, matchID) => dispatch => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let otherRef = firebase.firestore().collection('users').doc(otherID);
    console.log('reccomendedMatch', matchID, otherID);
    getMatchCategory(matchRef, otherID)
    .then(matchCategory => {
        //console.log('reccomended match', matchCategory);
        if (matchCategory === MUTUAL_MATCH) {
            return;
        }
        else {
            updateMatch(otherRef, RECCOMENDED_MATCH, matchID, userID);
            updateMatch(matchRef, RECCOMENDED_MATCH, otherID, userID);
        }
    })
    .catch(error => {
        console.log('no reccomendedMatch', error);
    })
}

//Use this function when a user approves a match with a reccomended
export const positiveReccomended = (matchID) => {
    let userID = firebase.auth().currentUser.uid;
    let matchRef = firebase.firestore().collection('users').doc(matchID);
    let userRef = firebase.firestore().collection('users').doc(userID);
    console.log('positiveReccomended', matchID);
    getMatchCategory(matchRef, userID)
    .then(matchCategory => {
        console.log('pos match', matchCategory);
        if (matchCategory == RECCOMENDED_MATCH) {
            dispatch(updateMatch(userRef, RECCOMENDED_POSITIVE_MATCH))
        }
        else if (matchCategory == RECCOMENDED_POSITIVE_MATCH) {
            dispatch(updateMatch(userRef, MUTUAL_MATCH, matchID));
            dispatch(updateMatch(matchRef, MUTUAL_MATCH, userID));
        }
        else {
            dispatch(updateMatch(userRef, NEGATIVE_MATCH, matchID));
        }
    })
    .catch(error => {
        console.log('positiveReccomended error', error);
    })
}
export const negativeReccomended = (matchID) => {
    let userID = firebase.auth().currentUser.uid;
    let userRef = firebase.firestore().collection('users').doc(userID);
    console.log('negativeReccomended', matchID);
    dispatch(updateMatch(userRef, NEGATIVE_MATCH, matchID));
}

//Helper Functions
//These functions add/remove a new matchID from the match collection
const updateMatch = (ref, category, matchID, reccomendedBy) => dispatch => {
    console.log('UPDATING', category, matchID);
    let matchInfo = {};
    if (category==POTENTIAL_MATCH) {
        matchInfo['score'] = calculateScore(matchID);
    }
    if (reccomendedBy) {
        matchInfo['reccomendedBy'] = reccomendedBy;
    }
    matchInfo['dateAdded'] = new Date();
    matchInfo['category'] = category;
    console.error(matchInfo)
    ref.collection('matches').doc(matchID).set(matchInfo, { merge: true })
    .then(function() {
        console.log("Match successfully Added!");
    })
    .catch(function(error) {
        console.error("Error adding Match: ", error);
    });
}

const deleteMatch = (ref, matchID) => {
    console.log('REMOVING', matchID);
    ref.collection('matches').doc(matchID).delete()
    .then(function() {
        console.log("Document successfully removed!");
    })
    .catch(function(error) {
        console.error("Error removing: ", category, error);
    });
}

//Check if the match is in a category and return the category
//Returns a promise to return the category
const getMatchCategory = (ref, matchID) => {
    console.log('getMatchCategory', matchID);
    return new Promise((resolve, reject) => {
        ref.collection('matches').doc(matchID).get()
        .then(doc => {
            if (doc.exists) {
                let data = doc.data();
                console.log('matchCategory', data, matchID);
                resolve(data.category);
            }
            resolve(POTENTIAL_MATCH);
        })
        .catch(error => {
            console.log('error getting match category'. error);
        })
    });
}
//Will later change to return a promise to the score.
const calculateScore = (matchID) => {
    return 10;
}



// //Given a userID, check if they are in the matches collection
// export const getPotential = (ref, docID) => dispatch => {
//     ref.collection(matches).doc(docID).get()
//       .then(doc => {
//         if (!doc.exists) {
//           return null;
//         } else {
//             console.log(doc.data());
//           return doc.data();
//         }
//       })
//       .catch(err => {
//         console.log('Error getting document', err);
//       });
// }

export const mutualMatch = (bool) => ({
    type: MUTUAL_MATCH_SCREEN,
    bool
});
