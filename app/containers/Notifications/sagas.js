import { put, takeEvery } from 'redux-saga/effects';
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
  CONTRACT_TX_SUCCESS,
} from '../AccountProvider/actions';

import {
  TEMP,
  loggedInSuccess,
  tableJoining,
  // tableJoined,
  temp,
  persist,
} from './constants';

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

function* txSuccess(action) {
  const { address, methodName, txHash } = action.payload;
  // begin joinTable process
  if (methodName === 'join') {
    const note = tableJoining;
    note.txId = txHash; // transactionId
    note.details = address; // tableId
    yield* createPersistNotification(note);
  }
  // end joinTable process
  /*
  if (methodName === '???') {
    // remove old peristant notification
    yield* removeNotification(txHash);
    // create new temp notification of join table success
    const note = tableJoined;
    note.details = address; // tableId
    yield* createTempNotification(note);
  }
  */
}

export function* notificationsSaga() {
  yield takeEvery(SET_AUTH, authNotification);
  yield takeEvery(CONTRACT_TX_SUCCESS, txSuccess);
  yield takeEvery(NOTIFY_CREATE, selectNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
}

export default [
  notificationsSaga,
];
