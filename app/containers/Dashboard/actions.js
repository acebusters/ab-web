// constants
export const OVERVIEW = 'overview';
export const WALLET = 'wallet';
export const EXCHANGE = 'exchange';
export const ETH = 'eth';
export const NTZ = 'ntz';

// actions
export const SET_ACTIVE_TAB = 'acebusters/Dashboard/SET_ACTIVE_TAB';
export const SET_AMOUNT_UNIT = 'acebusters/Dashboard/SET_AMOUNT_UNIT';
export const TRANSFER_TOKEN_NOTIFY = 'acebusters/Dashboard/TRANSFER_TOKEN_NOTIFY';

export const setActiveTab = (whichTab) => ({
  type: SET_ACTIVE_TAB,
  whichTab,
});

export const setAmountUnit = (unit) => ({
  type: SET_AMOUNT_UNIT,
  unit,
});

export const transferTokenNotify = () => ({
  type: TRANSFER_TOKEN_NOTIFY,
});
