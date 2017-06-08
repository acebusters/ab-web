/**
 * Created by jzobro on 20170606
 */
// const
export const ACTIONBAR_SET_ACTIVE = 'acebusters/ActionBar/SET_ACTIVE';
export const ACTIONBAR_TOGGLE_VISIBLE = 'acebusters/ActionBar/TOGGLE_VISIBLE';

// actions
export function setActionBarActive(active) {
  return {
    type: ACTIONBAR_SET_ACTIVE,
    active,
  };
}

export function toggleActionBarVisible() {
  return { type: ACTIONBAR_TOGGLE_VISIBLE };
}
