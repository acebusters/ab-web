import { call, fork, takeEvery, put } from 'redux-saga/effects';
import ethers from 'ethers';

import { INJECT_ACCOUNT_UPDATE, ACCOUNT_LOADED, setAuthState } from '../../AccountProvider/actions';

import * as storageService from '../../../services/localStorage';

import gtmSaga from './gtmSagas';
import unsupportedModalSaga from './unsupportedModalSaga';
import balancesLoadingSaga from './balancesLoadingSaga';

const totalBits = 768;
const bitsToBytes = (bits) => bits / 8;

function getWallet() {
  const crypto = window.crypto || window.msCrypto;
  if (storageService.getItem('wallet')) {
    const { mnemonic } = JSON.parse(storageService.getItem('wallet'));
    return ethers.Wallet.fromMnemonic(mnemonic);
  }

  const wallet = ethers.Wallet.createRandom({
    extraEntropy: Array.from(crypto.getRandomValues(new Uint8Array(bitsToBytes(totalBits)))),
  });

  storageService.setItem('wallet', JSON.stringify(wallet));

  return wallet;
}

function* walletSaga() {
  const wallet = yield call(getWallet);
  yield put(setAuthState({
    privKey: wallet.privateKey,
    loggedIn: true,
    generated: true,
  }));
}

export function* appSaga(dispatch) {
  yield fork(gtmSaga);
  yield fork(walletSaga);
  yield takeEvery(ACCOUNT_LOADED, unsupportedModalSaga);
  yield takeEvery(INJECT_ACCOUNT_UPDATE, balancesLoadingSaga, dispatch);
}

export default [appSaga];
