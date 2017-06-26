import { fromJS } from 'immutable';

import {
  ACCOUNT_LOADED,
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
 *   value: string;
 *   blockNumber: number;
 *   address: string;
 *   type: 'income' | 'outcome' | 'pending';
 *   transactionHash: string;
 *   date?: string;
 * }
 */
const initialState = fromJS({
  proxy: null,
  pending: {},
  pendingSell: [],
  events: [],
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_LOADED:
      return state.set('proxy', action.data.proxy);

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
        .reduce((newState, event) => completePending(
          addProxyEvent(newState, event),
          event.transactionHash
        ), state);

    case CONTRACT_EVENTS:
      return action.payload
        .reduce((newState, event) => completePending(
          addNTZContractEvent(newState, event),
          event.transactionHash
        ), state);

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

function makeEvent(event, address, unit, type) {
  return fromJS({
    blockNumber: event.blockNumber,
    transactionHash: event.transactionHash,
    value: event.args.value,
    date: event.date,
    address,
    unit,
    type,
  });
}

function addProxyEvent(state, event) {
  const events = state.get('events');
  const isReceived = event.event === 'Received';
  return state.set(
    'events',
    events.push(makeEvent(
      event,
      isReceived ? event.args.sender : event.address,
      'eth',
      isReceived ? 'income' : 'outcome',
    )),
  );
}

function addNTZContractEvent(state, event) {
  const events = state.get('events');

  if (event.event === 'Transfer') {
    return state.set(
      'events',
      events.push(makeEvent(
        event,
        event.args.to === state.get('proxy') ? event.args.from : event.args.to,
        'ntz',
        event.args.to === state.get('proxy') ? 'income' : 'outcome',
      )),
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
