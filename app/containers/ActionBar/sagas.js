import {
  // put,
  takeEvery,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { ACTIONBAR_SET_BUTTON_ACTIVE } from './actions';

function* buttonActive() {
  yield delay(100);
  console.log('buttonActive');
}

export function* actionBarSaga() {
  yield takeEvery(ACTIONBAR_SET_BUTTON_ACTIVE, buttonActive);
}

export default [
  actionBarSaga,
];
