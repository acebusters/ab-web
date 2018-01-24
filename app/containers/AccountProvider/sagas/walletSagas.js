import { call, put } from 'redux-saga/effects';
import ethers from 'ethers';

import { setAuthState, walletLoaded } from '../../AccountProvider/actions';

import * as localStorage from '../../../services/localStorage';

const totalBits = 768;
const bitsToBytes = (bits) => bits / 8;

function getWallet() {
  const crypto = window.crypto || window.msCrypto;
  if (localStorage.getItem('wallet')) {
    const { mnemonic } = JSON.parse(localStorage.getItem('wallet'));
    return ethers.Wallet.fromMnemonic(mnemonic);
  }

  const wallet = ethers.Wallet.createRandom({
    extraEntropy: Array.from(crypto.getRandomValues(new Uint8Array(bitsToBytes(totalBits)))),
  });

  localStorage.setItem('wallet', JSON.stringify(wallet));

  return wallet;
}

export function* walletSaga() {
  const wallet = yield call(getWallet);
  yield put(walletLoaded(wallet));
  yield put(setAuthState({
    privKey: wallet.privateKey,
    loggedIn: true,
    generated: true,
  }));
}

export function* logoutSaga({ newAuthState }) {
  if (!newAuthState.loggedIn) {
    yield put(walletLoaded());
    localStorage.removeItem('wallet');
    console.log('show modal with instructions how to restore wallet');
  }
}
