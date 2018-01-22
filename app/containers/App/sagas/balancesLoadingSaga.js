import { select } from 'redux-saga/effects';

import { makeSelectInjected, selectAccount } from '../../AccountProvider/selectors';
import { generateNetworkApi } from '../../AccountProvider/web3Connect';
import {
  ABI_TOKEN_CONTRACT,
  ABI_CONTROLLER_CONTRACT,
  conf,
} from '../../../app.config';

export default function* balancesLoadingSaga(dispatch) {
  const account = yield select(selectAccount);
  const injectedAddr = yield select(makeSelectInjected());

  const { web3 } = generateNetworkApi(account, dispatch);

  const token = web3.eth.contract(ABI_TOKEN_CONTRACT).at(conf().ntzAddr);
  const controller = web3.eth.contract(ABI_CONTROLLER_CONTRACT).at(conf().contrAddr);

  web3.eth.getBalance(injectedAddr);
  token.balanceOf.call(injectedAddr);
  controller.paused.call();
}
