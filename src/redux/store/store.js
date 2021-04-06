// This is the store in relation to redux not the purchasing store

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { fetchCollectionsStart } from '../shop/shop.sagas';

import rootReducer from '../root-reducer';
import rootSaga from '../root-saga';

const sagaMiddleware = createSagaMiddleware();

// Set up middleware btn actions and reducer

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  // If the node env is dev then run middleware loggers
  middlewares.push(logger);
}

// Actual store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Sagas
sagaMiddleware.run(rootSaga);

// Persisted version of our store
export const persistor = persistStore(store);

export default { store, persistor };
