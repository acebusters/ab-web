import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  delay,
} from 'redux-saga';
import {
  HANDLE_CLICK_BUTTON,
  BET_CONFIRM,
  RAISE_CONFIRM,
  BET,
  BET_SET,
  RAISE_SET,
  updateActionBar,
} from './actions';

function* handleClickButton({ buttonType }) {
  yield call(delay, 300);
  const update = {};
  if (buttonType === BET_CONFIRM || buttonType === RAISE_CONFIRM) {
    update.actionToExecute = BET;
  } else {
    update.actionToExecute = buttonType;
  }

  update.buttonActive = buttonType;
  update.mode = buttonType;

  // have container call action method for specific buttonTypes
  if (buttonType === BET_SET || buttonType === RAISE_SET) {
    update.sliderOpen = true;
  } else {
    update.executeAction = true;
    update.sliderOpen = false;
  }
  yield put(updateActionBar(update));
}

export function* actionBarSaga() {
  yield takeEvery(HANDLE_CLICK_BUTTON, handleClickButton);
}

export default [
  actionBarSaga,
];
