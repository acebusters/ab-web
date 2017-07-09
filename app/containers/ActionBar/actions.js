/**
 * Created by jzobro on 20170606
 */
// actions
export const ACTIONBAR_SET_TURN_COMPLETE = 'acebusters/ActionBar/SET_TURN_COMPLETE';
export const ACTIONBAR_SET_MODE = 'acebusters/ActionBar/SET_MODE';
export const ACTIONBAR_SET_BET_SLIDER = 'acebusters/ActionBar/SET_BET_SLIDER';
export const ACTIONBAR_SET_BUTTON_ACTIVE = 'acebusters/ActionBar/SET_BUTTON_ACTIVE';
export const HANDLE_CLICK_BUTTON = 'acebusters/ActionBar/HANDLE_CLICK_BUTTON';
export const SET_EXECUTE_ACTION = 'acebusters/ActionBar/SET_EXECUTE_ACTION';
export const SET_ACTION_TO_EXECUTE = 'acebusters/ActionBar/SET_ACTION_TO_EXECUTE';
export const UPDATE = 'acebusters/ActionBar/UPDATE';

// constants
export const FOLD = 'fold';
export const CHECK = 'check';
export const CALL = 'call';
export const BET = 'bet';
export const ALL_IN = 'all-in';
// bet related
export const BET_SET = 'bet-set';
export const BET_EDIT = 'bet-edit';
export const BET_CONFIRM = 'bet-confirm';
export const RAISE_SET = 'raise-set';
export const RAISE_EDIT = 'raise-edit';
export const RAISE_CONFIRM = 'raise-confirm';


// actionBar
export function setActionBarTurnComplete(complete) {
  return {
    type: ACTIONBAR_SET_TURN_COMPLETE,
    complete,
  };
}

export function setActionBarMode(mode) {
  return {
    type: ACTIONBAR_SET_MODE,
    mode,
  };
}

export function setActionBarButtonActive(whichBtn) {
  return {
    type: ACTIONBAR_SET_BUTTON_ACTIVE,
    whichBtn,
  };
}

// slider
export function setActionBarBetSlider(sliderOpen) {
  return {
    type: ACTIONBAR_SET_BET_SLIDER,
    sliderOpen,
  };
}

export const handleClickButton = (type) => ({
  type: HANDLE_CLICK_BUTTON,
  buttonType: type,
});

export const setExecuteAction = (bool) => ({
  type: SET_EXECUTE_ACTION,
  executeAction: bool,
});

export const setActionToExecute = (type) => ({
  type: SET_ACTION_TO_EXECUTE,
  actionToExecute: type,
});

export const updateActionBar = (payload) => ({
  type: UPDATE,
  payload,
});
