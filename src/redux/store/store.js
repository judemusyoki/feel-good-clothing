// This is the store in relation to redux not the purchasing store

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from '../root-reducer';

// Set up middleware btn actions and reducer

const middlewares = [logger];

// Actual store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
