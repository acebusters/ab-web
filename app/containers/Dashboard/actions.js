// constants
export const ADVANCED = 'advanced';
export const OVERVIEW = 'overview';
export const EXCHANGE = 'exchange';
export const POWERUP = 'powerUp';
export const POWERDOWN = 'powerDown';
export const ABP = 'apb';
export const ETH = 'eth';
export const NTZ = 'ntz';

// actions
export const SET_ACTIVE_TAB = 'acebusters/Dashboard/SET_ACTIVE_TAB';
export const SET_INVEST_TYPE = 'acebusters/Dashboard/SET_INVEST_TYPE';
export const SET_FISH_WARNED = 'acebusters/Dashboard/SET_FISH_WARNED';

export const setActiveTab = (whichTab) => ({
  type: SET_ACTIVE_TAB,
  whichTab,
});

export const setFishWarned = () => ({
  type: SET_FISH_WARNED,
});
