import React from 'react';
import { FormattedMessage } from 'react-intl';
import { delay } from 'redux-saga';
import { put, take, race } from 'redux-saga/effects';

import { CONTRACT_TX_SENDED, CONTRACT_TX_MINED, CONTRACT_TX_FAILED, CONTRACT_TX_NOT_EXISTS } from '../../AccountProvider/actions';
import { conf } from '../../../app.config';

import { notifyAdd, notifyDelete, notifyRemoving } from '../actions';
import {
  ETH_PAYOUT,
  InfoIcon,
  txPending,
  txSuccess,
} from '../constants';
import msgs from '../messages';

export function* createTempNotification(note) {
  yield put(notifyAdd(note));
  // TODO don't call removeNotification if NOTIFY_REMOVE is already dispatched
  // wait for NOTIFY_REMOVE to be dispatched by the user
  // or call NOTIFY_REMOVE after timeout
  yield delay(3000);
  yield* removeNotification({ txId: note.txId });
}

export function* createPersistNotification(note) {
  yield put(notifyAdd(note));
}

export function* removeNotification({ txId }) {
  // trigger remove note animation
  yield put(notifyRemoving(txId));
  // remove element after animation finishes
  yield delay(400);
  yield put(notifyDelete(txId));
}

function matchMethod(methodName, address) {
  return ({ payload }) => {
    if (address) {
      return payload.methodName === methodName && payload.address === address;
    }

    return payload.methodName === methodName;
  };
}

export function* createNotification({ notifyProps: { amount }, notifyType }) {
  if (notifyType === ETH_PAYOUT) {
    const pendingMsg = {
      ...txPending,
      category: <FormattedMessage {...msgs.payoutPending} />,
      details: <FormattedMessage values={{ amount }} {...msgs.ethPayout} />,
    };
    const successMsg = {
      ...txSuccess,
      category: <FormattedMessage {...msgs.payoutSuccess} />,
      details: <FormattedMessage values={{ amount }} {...msgs.ethPayout} />,
    };
    yield* createTransactionNotifications(matchMethod('withdraw', conf().pullAddr), pendingMsg, successMsg);
  }
}

export function* createTransactionNotifications(isNeededTx, pendingNotification, successNotification) {
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take((a) => a.type === CONTRACT_TX_SENDED && isNeededTx(a));
    const { payload: { txHash } } = action;
    yield* createPersistNotification({
      ...pendingNotification,
      txId: txHash,
      infoIcon: <InfoIcon transactionHash={txHash} />,
    });

    const { success, notExists, fail } = yield race({
      success: take((a) => a.type === CONTRACT_TX_MINED && a.meta.txHash === txHash),
      notExists: take((a) => a.type === CONTRACT_TX_NOT_EXISTS && a.meta.txHash === txHash),
      fail: take((a) => a.type === CONTRACT_TX_FAILED && a.meta.txHash === txHash),
    });
    yield* removeNotification({ txId: txHash });

    if (success && successNotification) {
      yield* createTempNotification(successNotification);
    } else if (fail) {
      yield* createTempNotification({
        txId: txHash,
        category: 'Error',
        details: 'Transaction failed',
        dismissable: true,
        date: new Date(),
        type: 'danger',
      });
    } else if (notExists) {
      yield* createTempNotification({
        txId: txHash,
        category: 'Error',
        details: 'Something wrong with transaction, check metamask',
        dismissable: true,
        date: new Date(),
        type: 'danger',
      });
    }
  }
}
