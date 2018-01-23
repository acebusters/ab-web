import { select, actionChannel, put, take, call } from 'redux-saga/effects';
import { promisifyWeb3Call } from '../../../utils/promisifyWeb3Call';

import { CONTRACT_TX_SEND, contractTxSended, contractTxError } from '../actions';
import { makeSelectAccountData } from '../selectors';

function* contractTransactionSend({ payload }) {
  const { injected: injectedAddr } = yield select(makeSelectAccountData());
  const { contractInstance, methodName, args: txArgs } = payload;

  const sendTransaction = yield call(promisifyWeb3Call, contractInstance[methodName].sendTransaction);
  const gas = yield payload.estimateGas;

  return yield call(sendTransaction, ...txArgs, { from: injectedAddr, gas });
}

export function* contractTransactionSendSaga() {
  const txChan = yield actionChannel(CONTRACT_TX_SEND);
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take(txChan);
    const { dest, key, callback = (() => null), args, methodName } = action.payload;

    try {
      const txHash = yield yield call(contractTransactionSend, action);
      yield call(callback, null, txHash);
      yield put(contractTxSended({ address: dest, txHash, key, args, methodName }));
    } catch (err) {
      const error = err.message || err;
      yield call(callback, error);
      yield put(contractTxError({ address: dest, error, args, methodName, action }));
    }
  }
}
