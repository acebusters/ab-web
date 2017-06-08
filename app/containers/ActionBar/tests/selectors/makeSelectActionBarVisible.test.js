import { fromJS } from 'immutable';
import { makeSelectActionBarVisible } from '../../selectors';

// action specific tests
describe('makeSelectActionBarVisible', () => {
  it('should select the tableMenu active state', () => {
    const mockedState = fromJS({
      actionBar: {
        visible: false,
      },
    });
    const statusSelector = makeSelectActionBarVisible();
    expect(statusSelector(mockedState)).toEqual(false);
  });
});
