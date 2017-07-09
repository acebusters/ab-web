import { fromJS } from 'immutable';

import reducer from '../reducer';
import {
  setActionBarTurnComplete,
  setActionBarButtonActive,
} from '../actions';

describe('setActionBarTurnComplete', () => {
  it('should set "active" value', () => {
    const before = fromJS({
      turnComplete: false,
    });
    const nextState = reducer(before, setActionBarTurnComplete(true));
    expect(nextState.get('turnComplete')).toEqual(true);
  });
});

describe('setActionBarButtonActive', () => {
  it('should set "sliderOpen" value', () => {
    const before = fromJS({
      sliderOpen: false,
    });
    const nextState = reducer(before, setActionBarButtonActive('CALL'));
    expect(nextState.get('buttonActive')).toEqual('CALL');
  });
});
