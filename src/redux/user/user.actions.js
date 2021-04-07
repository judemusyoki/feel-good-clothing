// Action creator function, returns object in the format the action is supposed to be
import UserActionTypes from './user.types';

// No payload because we're telling saga
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

// Payload because we will need user object at the end
export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});
