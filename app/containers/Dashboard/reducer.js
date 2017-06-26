import { fromJS } from 'immutable';

import {
  CONTRACT_EVENTS,
  PROXY_EVENTS,
  ETH_CLAIM,
  CONTRACT_TX_SUCCESS,
  ETH_TRANSFER_SUCCESS,
  CONTRACT_TX_ERROR,
} from '../AccountProvider/actions';

import { conf } from '../../app.config';

const confParams = conf();

/**
 * interface DashboardEvent {
 *   unit: 'eth' | 'ntz';
 *   value: BigNumber;
 *   blockNumber: number;
 *   address: string;
 *   type: 'income' | 'outcome' | 'pending';
 *   transactionHash: string;
 *   date: string;
 * }
 */
const initialState = fromJS({
  pending: {},
  pendingSell: [],
  events: {},
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case ETH_CLAIM:
      return state.withMutations((newState) => {
        const index = newState.get('pendingSell').indexOf(action.payload.sellTxHash);
        return newState.deleteIn(['pendingSell', index]);
      });

    case CONTRACT_TX_SUCCESS:
      return addPending(
        addPendingSell(state, action),
        action
      );

    case ETH_TRANSFER_SUCCESS:
      return addPending(state, action);

    case CONTRACT_TX_ERROR:
      return state.setIn(['pending', action.payload.nonce, 'error'], action.payload.error);

    case PROXY_EVENTS:
      return action.payload
        .map(({ transactionHash }) => transactionHash)
        .reduce(completePending, state);

    case CONTRACT_EVENTS:
      return action.payload.reduce(handleEvent, state);

    default:
      return state;
  }
}

export default dashboardReducer;

function addPending(state, action) {
  // the nonce is only increased after the call was successfull.
  // in the account saga we use a channel, so no 2 requests are submitted
  // at the same time and no nonce can be reused by accident.
  return state.set('lastNonce', action.payload.nonce)
              .setIn(['pending', action.payload.nonce, 'txHash'], action.payload.txHash);
}

function addPendingSell(state, action) {
  const { payload: { address, txHash, methodName } } = action;
  if (address === confParams.ntzAddr && methodName === 'transfer') {
    return state.set(
      'pendingSell',
      state.get('pendingSell').push(txHash)
    );
  }

  return state;
}

function completePending(state, txHash) {
  return state.get('pending').reduce((st, value, key) => {
    if (value.get('txHash') === txHash) {
      return st.deleteIn(['pending', key]);
    }

    return st;
  }, state);
}

function handleEvent(state, event) {
  return completePending(state, event.transactionHash);
}
