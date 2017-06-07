// import { fromJS } from 'immutable';
// import EWT from 'ethereum-web-token';
//
import {
//   makeSelectOpen,
  makeSelectActive,
} from '../selectors';

describe('containers.TableMenu.selectors', () => {
  it('should select the tableMenu active state', () => {
    const activeState = false;
    // const mockedState = fromJS({ active: activeState });
    expect(makeSelectActive()).toEqual(activeState);
  });
  it('should select the tableMenu open state', () => {});
});
