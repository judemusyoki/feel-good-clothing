// Action creator function, returns object in the format the action is supposed to be

export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
})