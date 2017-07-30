/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createWorkerMiddleware from 'redux-worker-middleware';

import createReducer from './reducers';
import { setAuthState } from './containers/AccountProvider/actions';
import { accountSaga } from './containers/AccountProvider/sagas';
import { loginSaga } from './containers/LoginPage/sagas';
import { registerSaga } from './containers/RegisterPage/sagas';
import { generateSaga } from './containers/GeneratePage/sagas';
import { formActionSaga } from './services/reduxFormSaga';
import { notificationsSaga } from './containers/Notifications/sagas';

import * as storageService from './services/localStorage';

const sagaMiddleware = createSagaMiddleware();

const LoginWorker = require('worker-loader!../app/containers/LoginPage/worker.js');
const loginWorker = new LoginWorker();

const GenerateWorker = require('worker-loader!../app/containers/GeneratePage/worker.js');
const generateWorker = new GenerateWorker();

const loginWorkerMiddleware = createWorkerMiddleware(loginWorker);
const generateWorkerMiddleware = createWorkerMiddleware(generateWorker);

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    loginWorkerMiddleware,
    generateWorkerMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  sagaMiddleware.run(
    formActionSaga,
    accountSaga,
    loginSaga,
    generateSaga,
    registerSaga,
    notificationsSaga,
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  if (isLoggedIn()) {
    store.dispatch(setAuthState({
      loggedIn: true,
      privKey: storageService.getItem('privKey'),
      email: storageService.getItem('email'),
    }));
  } else {
    store.dispatch(setAuthState({ loggedIn: false }));
  }

  return store;
}

function isLoggedIn() {
  const privKey = storageService.getItem('privKey');
  return (privKey !== undefined && privKey.length > 32);
}
