import { takeEvery, fork } from 'redux-saga/effects';

import { ACCOUNT_LOADED, INJECT_ACCOUNT_UPDATE, CONTRACT_TX_SEND } from '../../AccountProvider/actions';

import { NOTIFY_CREATE, NOTIFY_REMOVE } from '../actions';

import { createNotification, removeNotification } from './utils';
import { injectedWeb3Notification, injectedWeb3NotificationDismiss } from './accountNotificationsSagas';
import { tableNotifications } from './tableNotificationsSaga';
import { connectionNotifications } from './connectionNotificationsSaga';

export function* notificationsSaga() {
  yield takeEvery(ACCOUNT_LOADED, injectedWeb3Notification);
  yield takeEvery(INJECT_ACCOUNT_UPDATE, injectedWeb3NotificationDismiss);
  yield takeEvery(NOTIFY_CREATE, createNotification);
  yield takeEvery(NOTIFY_REMOVE, removeNotification);
  yield takeEvery(CONTRACT_TX_SEND, tableNotifications);

  yield fork(connectionNotifications);
}

export default [
  notificationsSaga,
];
