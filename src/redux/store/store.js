// This is the store in relation to redux not the purchasing store

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from '../root-reducer';

// Set up middleware btn actions and reducer

const middlewares = [logger];

// Actual store
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;