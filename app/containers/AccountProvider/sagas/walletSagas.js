import { call, put, select } from 'redux-saga/effects';
import ethers from 'ethers';

import { setAuthState, walletLoaded } from '../../AccountProvider/actions';
import { makeSelectWallet } from '../../AccountProvider/selectors';

import * as localStorage from '../../../services/localStorage';
import * as accountService from '../../../services/account';
import { modalDismiss, modalAdd } from '../../App/actions';
import { LOGOUT_DIALOG } from '../../Modal/constants';

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

  accountService.requestFunds(wallet.address);

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
    const wallet = yield select(makeSelectWallet());
    yield put(walletLoaded());
    yield put(modalAdd({
      modalType: LOGOUT_DIALOG,
      modalProps: { wallet },
    }));
    localStorage.removeItem('wallet');
  }
}

export function* importSaga({ payload: mnemonic }) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  yield put(walletLoaded(wallet));
  yield put(setAuthState({
    privKey: wallet.privateKey,
    loggedIn: true,
    generated: true,
  }));
  yield put(modalDismiss());
  localStorage.setItem('wallet', JSON.stringify(wallet));
}
