export const combine = (describe, it) => `${describe}, ${it}`;

export const test1 = {
  describe: 'during table "waiting"',
  props: {
    state: 'waiting',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
  },
  it: 'actionBar should not render',
};

export const test2 = {
  describe: 'during table "dealing"',
  props: {
    state: 'dealing',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
  },
  it: 'actionBar should not render',
};

export const test3 = {
  describe: 'during table "flop"',
  props: {
    active: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
  },
  it: 'actionBar should render',
};

export const test4 = {
  describe: 'during table "flop" if isMyTurn is false',
  props: {
    active: false,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: false,
  },
  it: 'actionBar should not render',
};

export const test5 = {
  describe: 'when amountToCall is greater than 0',
  props: {
    active: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    amountToCall: 1000,
  },
  it: 'should render fold button',
};

export const test6 = {
  describe: 'when amountToCall is 0',
  props: {
    active: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    amountToCall: 0,
  },
  it: 'should not render fold button',
};

export const test7 = {
  describe: 'with the correct betting amount',
  props: {
    active: true,
    amount: 2000,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    minRaise: 2000,
    amountToCall: 0,
    myStack: 10000,
  },
  it: 'should render BET button',
};
