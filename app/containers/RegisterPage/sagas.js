import { take, put, call } from 'redux-saga/effects';
import { stopSubmit, startSubmit } from 'redux-form/immutable';
import { push } from 'react-router-redux';
import account from '../../services/account';
import { setProgress } from '../App/actions';

import { REGISTER } from './constants';

// The root saga is what is sent to Redux's middleware.
export function* registerSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload } = yield take(REGISTER);

    yield put(setProgress(-3000));
    yield put(startSubmit('register'));

    try {
      yield call(
        account.register,
        payload.email,
        payload.captchaResponse,
        payload.origin,
        payload.referral
      );

      yield put(push('/confirm'));
    } catch (err) {
      const errors = {};
      if (err === 409) {
        errors.email = 'Email taken.';
        errors._error = 'Registration failed!'; // eslint-disable-line no-underscore-dangle
      } else {
        errors._error = `Registration failed with error code ${err}`; // eslint-disable-line no-underscore-dangle
      }
      yield put(stopSubmit('register', errors));
    } finally {
      yield put(setProgress(100));
    }
  }
}

export default [
  registerSaga,
];
