// code that combines other states/reducers together

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';


export default combineReducers({
  user: userReducer
})
