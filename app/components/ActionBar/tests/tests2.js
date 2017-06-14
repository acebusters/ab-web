export const combine = (describe, it) => `${describe}, ${it}`;

export const atTable0 = {
  describe: 'when not at table',
  it: 'actionBar should not render',
  props: {
    params: {
      tableAddr: '0x123',
    },
    visible: false,
  },
};

export const atTable1 = {
  describe: 'when at table, and not Turn',
  it: 'actionBar should render as disabled',
  props: {
    params: {
      tableAddr: '0x123',
    },
    active: false,
    visible: true,
  },
};

export const atTable2 = {
  describe: 'when at table, and is Turn',
  it: 'actionBar should render',
  props: {
    params: {
      tableAddr: '0x123',
    },
    active: true,
    visible: true,
  },
};

export const amountToCall1 = {
  describe: 'when amountToCall === 0',
  it: 'should render !fold, check, bet button',
  props: {
    active: true,
    visible: true,
    isMyTurn: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    amountToCall: 0,
    callAmount: 0,
    amount: 0,
    myStack: 2000,
  },
};

export const amountToCall2 = {
  describe: 'when amountToCall > 0',
  it: 'should render fold, call, raise button',
  props: {
    active: true,
    visible: true,
    isMyTurn: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    amountToCall: 1000,
    callAmount: 1000,
    amount: 1000,
    myStack: 2000,
  },
};

export const amountToCall3 = {
  describe: 'when amountToCall > myStack',
  it: 'should render fold, !call, all-in button',
  props: {
    active: true,
    visible: true,
    isMyTurn: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    amountToCall: 10000,
    callAmount: 10000,
    amount: 2000,
    myStack: 2000,
  },
};
