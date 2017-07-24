import { put, takeEvery, take, select, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'uuid/v4';

import {
  NOTIFY_CREATE,
  NOTIFY_REMOVE,
  notifyAdd,
  notifyDelete,
  notifyRemoving,
} from './actions';

import {
  SET_AUTH,
  ACCOUNT_LOADED,
  INJECT_ACCOUNT_UPDATE,
  CONTRACT_TX_SEND,
  CONTRACT_TX_SUCCESS,
  CONTRACT_TX_FAIL,
} from '../AccountProvider/actions';

import { getWeb3 } from '../AccountProvider/utils';

import {
  TEMP,
  loggedInSuccess,
  noWeb3Danger,
  temp,
  persist,
} from './constants';

import { waitForTx } from '../../utils/waitForTx';

function* createTempNotification(note) {
  yield put(notifyAdd(note));
  // TODO don't call removeNotification if NOTIFY_REMOVE is already dispatched
  // wait for NOTIFY_REMOVE to be dispatched by the user
  // or call NOTIFY_REMOVE after timeout
  yield delay(3000);
  yield* removeNotification({ txId: note.txId });
}

function* createPersistNotification(note) {
  yield put(notifyAdd(note));
}

function* selectNotification(action) {
  if (action.notifyType === TEMP) {
    temp.txId = uuid();
    yield* createTempNotification(temp);
  } else {
    persist.txId = uuid();
    // if persist
    yield* createPersistNotification(persist);
  }
}

function* removeNotification({ txId }) {
  // trigger remove note animation
  yield put(notifyRemoving(txId));
  // remove element after animation finishes
  yield delay(400);
  yield put(notifyDelete(txId));
}

function* authNotification({ newAuthState }) {
  const { loggedIn } = newAuthState;
  if (loggedIn) {
    yield* createTempNotification(loggedInSuccess);
  }
}

function* injectedWeb3Notification({ payload: { isLocked } }) {
  if (!isLocked) {
    const state = yield select();
    const injected = yield call([state, state.getIn], ['account', 'injected']);
    if (!injected) {
      yield* createPersistNotification(noWeb3Danger);
    }
  }
}

function* injectedWeb3NotificationDismiss({ payload: injected }) {
  if (typeof injected === 'string') {
    yield put(notifyDelete(noWeb3Danger.txId));
  }
}

function* tableJoinNotification(sendAction) {
  const state = yield select();
  const table = yield call([state, state.get], 'table');
  const isLocked = yield call([state, state.getIn], ['account', 'isLocked']);

  console.log('checking if address is tableAddr', table.toJS(), sendAction.payload.args[0], sendAction.payload);

  if (isLocked) { // do not need to show notification for shark account here
    console.log('show pending table notification');
  }

  if (table.has(sendAction.payload.args[0])) {
    while (true) { // eslint-disable-line no-constant-condition
      const finalAction = yield take([CONTRACT_TX_FAIL, CONTRACT_TX_SUCCESS]);
      try {
        if (sendAction.payload.args[0] === finalAction.payload.args[0]) {
          if (finalAction === CONTRACT_TX_SUCCESS) {
            if (!isLocked) { // show notification for sharks (after submitting tx in metamask)
              console.log('show pending table notification');
            }

            const web3 = yield call(getWeb3);
            console.log('waitForTx', finalAction.payload.txHash);
            yield call(waitForTx, web3, finalAction.payload.txHash);
            console.log('show success table notification');
          } else {
            console.warn('fail');
            throw finalAction;
          }
        }
      } catch (e) {
        console.log(e);
        console.log('show error table notification');
      } finally {
        console.log('remove table notification');
      }
    }
  }
}

export function* notificationsSaga() {
  yield takeEvery(SET_AUTH, authNotification);
  yield takeEvery(ACCOUNT_LOADED, injectedWeb3Notification);
  yield takeEvery(INJECT_ACCOUNT_UPDATE, injectedWeb3NotificationDismiss);
  yield takeEvery(NOTIFY_CREATE, selectNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
  yield takeEvery(CONTRACT_TX_SEND, tableJoinNotification);
}

export default [
  notificationsSaga,
];
