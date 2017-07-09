/* eslint-disable global-require */
const isPlayerTurn = new Audio(require('./assets/33788__jobro__5-beep-b.wav'));
const actionBarClick = new Audio(require('./assets/219069__annabloom__click1.wav'));
actionBarClick.volume = 0.2;

export function playIsPlayerTurn() {
  isPlayerTurn.play();
}

export function playActionBarClick() {
  actionBarClick.play();
}
