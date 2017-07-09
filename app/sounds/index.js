/* eslint-disable global-require */
const isPlayerTurn = new Audio(require('./assets/33788__jobro__5-beep-b.wav'));
const actionBarClick = new Audio(require('./assets/321104__nsstudios__blip2.wav'));

export function playIsPlayerTurn() {
  isPlayerTurn.play();
}

export function playActionBarClick() {
  actionBarClick.play();
}
