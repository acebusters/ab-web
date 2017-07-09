import {
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  // delay,
} from 'redux-saga';
import {
  HANDLE_CLICK_BUTTON,
  BET_CONFIRM,
  RAISE_CONFIRM,
  BET,
  BET_SET,
  RAISE_SET,
  setActionBarButtonActive,
  setActionBarBetSlider,
  setActionBarMode,
  setActionToExecute,
  setExecuteAction,
} from './actions';

function* handleClickButton({ buttonType }) {
  if (buttonType === BET_CONFIRM || buttonType === RAISE_CONFIRM) {
    yield put(setActionToExecute(BET));
  } else {
    yield put(setActionToExecute(buttonType));
  }

  yield put(setActionBarButtonActive(buttonType));
  yield put(setActionBarMode(buttonType));

  // have container call action method
  // for specific buttonTypes
  if (buttonType === BET_SET || buttonType === RAISE_SET) {
    yield put(setActionBarBetSlider(true));
  } else {
    yield put(setExecuteAction(true));
    yield put(setActionBarBetSlider(false));
  }
}

export function* actionBarSaga() {
  yield takeEvery(HANDLE_CLICK_BUTTON, handleClickButton);
}

export default [
  actionBarSaga,
];
