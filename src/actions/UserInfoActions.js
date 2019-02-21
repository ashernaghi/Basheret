import { USER_INFO_UPDATE } from './types';
export const userInfoUpdate = (category, response) => ({
    type: USER_INFO_UPDATE,
    category,
    response
});

//Have an async action that pushes this information to firebase each time a question is answered 

//Have an async action that fetches the user's information from the db 