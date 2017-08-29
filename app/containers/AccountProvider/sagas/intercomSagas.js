import { select } from 'redux-saga/effects';

import { makeSelectAccountData } from '../selectors';

export function* updateIntercomUser(action) {
  const account = yield select(makeSelectAccountData());
  if (window.Intercom && account.loggedIn) {
    window.Intercom('update', {
      email: account.email,
      user_id: action.payload.signer,
    });
  }
}

export function* updateIntercomOnLocationChange() {
  if (window.Intercom) {
    window.Intercom('update');
  }
}

export function* restartIntercomOnLogout(action) {
  if (!window.Intercom) {
    return;
  }

  if (!action.newAuthState.loggedIn) {
    window.Intercom('shutdown');
    window.Intercom('boot');
  }
}
