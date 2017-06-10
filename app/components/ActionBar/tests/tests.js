export const combine = (describe, it) => `${describe}, ${it}`;

export default [{
  describe: 'during table "waiting"',
  props: {
    state: 'waiting',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
  },
  it: 'actionBar should not render',
}, {
  describe: 'during table "dealing"',
  props: {
    state: 'dealing',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
  },
  it: 'actionBar should not render',
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
  /* tests[7] */
  describe: 'RAISE button min amount',
  props: {
    active: true,
    amount: 5000,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    minRaise: 5000,
    amountToCall: 1000,
    myStack: 10000,
  },
  it: 'should render with correct min amount',
}, {
  /* tests[8] */
  describe: 'if all-in amount',
  props: {
    active: true,
    amount: 1750,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    myStack: 1750,
    amountToCall: 0,
  },
  it: 'should set BET to all-in amount',
}, {
  /* tests[9] */
  describe: 'when amount to call is 0',
  props: {
    active: true,
    state: 'flop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    amountToCall: 0,
  },
  it: 'should render the CHECK button',
}, {
  /* tests[10] */
  describe: 'when amount to call is greater than 0',
  props: {
    active: true,
    amount: 1000,
    state: 'preflop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    callAmount: 1000,
    amountToCall: 1000,
    myStack: 2000,
  },
  it: 'should render the CALL button',
}, {
  /* tests[11] */
  describe: 'if amount to call is bigger than myStack',
  props: {
    active: true,
    amount: 800,
    state: 'preflop',
    params: {
      tableAddr: '0x123',
    },
    isMyTurn: true,
    callAmount: 800,
    amountToCall: 1000,
    myStack: 800,
  },
  it: 'should not render the RAISE button',
}, {
  /* tests[12] */
  describe: 'after action was taken',
  props: {
    active: false,
    state: 'flop',
    params: {
      tableAddr: '0x123',
      handId: 1,
    },
    isMyTurn: true,
    amountToCall: 1000,
  },
  it: 'actionBar should dissappear',
}];
