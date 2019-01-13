/* global window */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistCombineReducers, autoRehydrate } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from '../reducers';
import apiMiddleware from './apiMiddleware';

// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['status'],
};

const reducer = persistCombineReducers(config, reducers);

// const middleware = [thunk];

const configureStore = () => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(thunk, apiMiddleware)),
    // autoRehydrate()
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  persistor.purge()

  return { persistor, store };
};

export default configureStore;
