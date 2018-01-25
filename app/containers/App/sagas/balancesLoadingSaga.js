import { select } from 'redux-saga/effects';

import { makeSignerAddrSelector, selectAccount } from '../../AccountProvider/selectors';
import { generateNetworkApi } from '../../AccountProvider/web3Connect';
import {
  ABI_TOKEN_CONTRACT,
  ABI_CONTROLLER_CONTRACT,
  conf,
} from '../../../app.config';

export default function* balancesLoadingSaga(dispatch) {
  const account = yield select(selectAccount);
  const signerAddr = yield select(makeSignerAddrSelector());

  const { web3 } = generateNetworkApi(account, dispatch);

  const token = web3.eth.contract(ABI_TOKEN_CONTRACT).at(conf().ntzAddr);
  const controller = web3.eth.contract(ABI_CONTROLLER_CONTRACT).at(conf().contrAddr);

  web3.eth.getBalance(signerAddr);
  token.balanceOf.call(signerAddr);
  controller.paused.call();
}
