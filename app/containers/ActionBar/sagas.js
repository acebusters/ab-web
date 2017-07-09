import {
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  // delay,
} from 'redux-saga';
import {
  HANDLE_CLICK_BUTTON,
  setActionBarButtonActive,
  setActionBarBetSlider,
  setActionBarMode,
  setActionToExecute,
  setExecuteAction,
} from './actions';

function* handleClickButton({ buttonType }) {
  // yield delay(100);
  yield put(setActionBarButtonActive(buttonType));
  yield put(setActionBarBetSlider(false));
  yield put(setActionBarMode(buttonType));
  yield put(setActionToExecute(buttonType));
  yield put(setExecuteAction(true));
}

export function* actionBarSaga() {
  yield takeEvery(HANDLE_CLICK_BUTTON, handleClickButton);
}

export default [
  actionBarSaga,
];
