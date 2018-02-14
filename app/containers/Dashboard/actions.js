// actions
export const SET_ACTIVE_TAB = 'acebusters/Dashboard/SET_ACTIVE_TAB';
export const SET_FISH_WARNED = 'acebusters/Dashboard/SET_FISH_WARNED';

export const setActiveTab = (whichTab) => ({
  type: SET_ACTIVE_TAB,
  whichTab,
});

export const setFishWarned = () => ({
  type: SET_FISH_WARNED,
});
