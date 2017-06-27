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
 *   blockNumber?: number;
 *   address: string;
 *   type: 'income' | 'outcome' | 'pending';
 *   transactionHash: string;
 *   timestamp?: number;
 *   pending?: boolean;
 * }
 */
const initialState = fromJS({
  proxy: null,
  pending: {},
  pendingSell: [],
  events: {},
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
      return addNTZPending(
        addPendingSell(state, action),
        action.payload
      );

    case ETH_TRANSFER_SUCCESS:
      return addETHPending(state, action.payload);

    case CONTRACT_TX_ERROR:
      return state.setIn(['pending', action.payload.nonce, 'error'], action.payload.error);

    case PROXY_EVENTS:
      // console.log('proxy', action.payload);
      return action.payload
        .reduce((newState, event) => completePending(
          addProxyEvent(newState, event),
          event.transactionHash
        ), state);

    case CONTRACT_EVENTS:
      // console.log('nutz', action.payload);
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

function addETHPending(state, { txHash, amount, address }) {
  return state.setIn(
    ['events', txHash],
    fromJS({
      address,
      value: amount.toString ? amount.toString() : amount,
      type: 'outcome',
      unit: 'eth',
      pending: true,
      transactionHash: txHash,
    }),
  );
}

function addNTZPending(state, { methodName, args, txHash }) {
  if (methodName === 'transfer' && args[0] !== confParams.ntzAddr) {
    return state.setIn(
      ['events', txHash],
      fromJS({
        address: args[0],
        value: args[1].toString ? args[1].toString() : args[1],
        type: 'outcome',
        unit: 'ntz',
        pending: true,
        transactionHash: txHash,
      }),
    );
  } else if (methodName === 'transfer' && args[0] === confParams.ntzAddr) {
    return state.setIn(
      ['events', txHash],
      fromJS({
        address: confParams.ntzAddr,
        value: args[1].toString ? args[1].toString() : args[1],
        type: 'outcome',
        unit: 'ntz',
        pending: true,
        transactionHash: txHash,
      }),
    );
  }

  return state;
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

function addProxyEvent(state, event) {
  const isReceived = event.event === 'Received';
  return state.setIn(
    ['events', event.transactionHash],
    fromJS({
      blockNumber: event.blockNumber,
      transactionHash: event.transactionHash,
      value: event.args.value,
      timestamp: event.timestamp,
      address: isReceived ? event.args.sender : event.address,
      unit: 'eth',
      type: isReceived ? 'income' : 'outcome',
    }),
  );
}

function addNTZContractEvent(state, event) {
  if (event.event === 'Transfer') {
    const isIncome = event.args.to === state.get('proxy');
    return state.setIn(
      ['events', event.transactionHash],
      fromJS({
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        value: event.args.value,
        timestamp: event.timestamp,
        address: isIncome ? event.args.from : event.args.to,
        unit: 'ntz',
        type: isIncome ? 'income' : 'outcome',
      }),
    );
  } else if (event.event === 'Sell') {
    return state.setIn(
      ['events', event.transactionHash],
      fromJS({
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        value: event.args.value,
        timestamp: event.timestamp,
        address: confParams.ntzAddr,
        unit: 'ntz',
        type: 'outcome',
      }),
    );
  } else if (event.event === 'Purchase') {
    return state.setIn(
      ['events', event.transactionHash],
      fromJS({
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        value: event.args.value,
        timestamp: event.timestamp,
        address: state.get('proxy'),
        unit: 'ntz',
        type: 'income',
      }),
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
