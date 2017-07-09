/**
 * Created by jzobro on 20170608
 */
import { fromJS } from 'immutable';
import * as types from './actions';

export const initialState = fromJS({
  buttonActive: '', // used for activeIndicator
  sliderOpen: false, // toggles slider open/closed
  turnComplete: false,
  mode: '', // tracks active button's life-cycle
  executeAction: false,
  actionToExecute: null,
});

export default function actionBarReducer(state = initialState, action) {
  switch (action.type) {

    case types.ACTIONBAR_SET_TURN_COMPLETE: {
      return state.set('turnComplete', action.complete);
    }

    case types.ACTIONBAR_SET_MODE: {
      if (action.mode === null) {
        return state;
      }
      return state.set('mode', action.mode);
    }

    case types.ACTIONBAR_SET_BET_SLIDER: {
      return state.set('sliderOpen', action.sliderOpen);
    }

    case types.ACTIONBAR_SET_BUTTON_ACTIVE: {
      return state.set('buttonActive', action.whichBtn);
    }

    case types.SET_EXECUTE_ACTION: {
      return state.set('executeAction', action.executeAction);
    }

    case types.SET_ACTION_TO_EXECUTE: {
      return state.set('actionToExecute', action.actionToExecute);
    }

    default: {
      return state;
    }
  }
}
