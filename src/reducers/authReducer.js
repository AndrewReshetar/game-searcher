const initial = {
  isSignedIn: false,
  username: ''
};

export const authReducer = (state = initial, action) => {
  switch (action.type) {
    case 'SIGN_IN': return { ...state, isSignedIn: true, username: action.payload }
    case 'SIGN_OUT': return { ...state, isSignedIn: false, username: '' }
    default: return state;
  }
}