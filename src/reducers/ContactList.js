const INITIAL_STATE = {
  userId1: "",
  username1: "",
  userProfile1: "",
  userId2: "",
  username2: "",
  userProfile2: "",
  showHeader: true,
  show: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_USER_1":
      return {
        ...state,
        userId1: action.payload.userId1,
        username1: action.payload.username1,
        userProfile1: action.payload.userProfile1
      };
    case "ADD_USER_2":
      return {
        ...state,
        userId2: action.payload.userId2,
        username2: action.payload.username2,
        userProfile2: action.payload.userProfile2
      };
    case "SHOW_HEADER":
      return {
        ...state,
        showHeader: action.payload.showHeader
      };
    case "SHOW_COMPONENT":
      return {
        ...state,
        show: action.payload.show
      };
    default:
      return state;
  }
}
