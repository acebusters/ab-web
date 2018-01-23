import { select, take, put, fork } from 'redux-saga/effects';

import { makeSelectInjected, selectAccount } from '../../AccountProvider/selectors';
import { ethEvent } from '../../AccountProvider/sagas/ethEventListenerSaga';
import { addEventsDate, isUserEvent } from '../../AccountProvider/utils';
import { generateNetworkApi } from '../../AccountProvider/web3Connect';
import { contractEvents } from '../../AccountProvider/actions';
import { ABI_TOKEN_CONTRACT, conf } from '../../../app.config';
import { promisifyWeb3Call } from '../../../utils/promisifyWeb3Call';
import { LOOK_BEHIND_PERIOD } from '../constants';

function* initEvents(contract, fromBlock, proxyAddr, action) {
  const allEvents = contract.allEvents({
    fromBlock,
    toBlock: 'latest',
  });
  const eventList = yield promisifyWeb3Call(allEvents.get.bind(allEvents))();
  const userEvents = yield addEventsDate(eventList.filter(isUserEvent(proxyAddr)));
  yield put(action(userEvents, proxyAddr));
}

function* tokenEventsSaga(token, addr) {
  const tokenChannel = ethEvent(token);
  while (true) { // eslint-disable-line
    const event = yield take(tokenChannel);

    if (!isUserEvent(addr)(event)) {
      continue; // eslint-disable-line no-continue
    }

    const events = yield addEventsDate([event]);
    yield put(contractEvents(events, addr));

    token.balanceOf.call(addr);
    token.web3.eth.getBalance(addr);
  }
}

export function* eventsSaga(dispatch) {
  const account = yield select(selectAccount);
  const injectedAddr = yield select(makeSelectInjected());

  const { web3 } = generateNetworkApi(account, dispatch);
  const blockNumber = yield promisifyWeb3Call(web3.eth.getBlockNumber)();

  const token = web3.eth.contract(ABI_TOKEN_CONTRACT).at(conf().ntzAddr);

  web3.eth.getBalance(injectedAddr);
  token.balanceOf.call(injectedAddr);

  yield initEvents(token, blockNumber - LOOK_BEHIND_PERIOD, injectedAddr, contractEvents);
  yield fork(tokenEventsSaga, token, injectedAddr);
}
