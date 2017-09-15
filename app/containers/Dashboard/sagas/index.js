import { takeEvery, select, fork, call, put } from 'redux-saga/effects';
import { setItem, removeItem, getItem } from '../../../services/localStorage';

import { CONTRACT_EVENTS, PROXY_EVENTS, CONTRACT_TX_SENDED } from '../../AccountProvider/actions';
import { createPendingsSelector } from '../selectors';
import { restorePendings } from '../actions';

const STORAGE_KEY = 'pending_tx';

export function* savePendingsSaga() {
  const pendings = yield select(createPendingsSelector());
  if (pendings) {
    if (pendings.size > 0) {
      yield call(setItem, STORAGE_KEY, JSON.stringify(pendings.toJS()));
    } else {
      yield call(removeItem, STORAGE_KEY);
    }
  }
}

export function* restorePendingsSaga() {
  const pendings = yield call(getItem, STORAGE_KEY);
  if (pendings) {
    yield put(restorePendings(JSON.parse(pendings)));
  }
}

export function* dashboardSagas() {
  yield fork(restorePendingsSaga);
  yield takeEvery([CONTRACT_TX_SENDED, PROXY_EVENTS, CONTRACT_EVENTS], savePendingsSaga);
}

export default [dashboardSagas];
