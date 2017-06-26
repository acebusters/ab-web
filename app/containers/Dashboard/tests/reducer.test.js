import { fromJS } from 'immutable';
import dashboardReducer from '../reducer';
import { contractEvent } from '../../AccountProvider/actions';

describe('dashboard reducer tests', () => {
  it('should return the default state.', () => {
    expect(dashboardReducer(undefined, {}).toJS()).toEqual({
      pending: {},
      pendingSell: [],
    });
  });

  it('should complete pending tx on matching event', () => {
    expect(dashboardReducer(
      fromJS({
        pending: {
          1: { txHash: '0x67ed561b9e1842016fda612d1940135465968cd3de0ea7008e7240347fe80bc1' },
          2: { txHash: '0x51fda47ac9113cdd7068e9bb7dec55cb170d1ca694afd442f77a56add4b3c86b' },
        },
      }),
      contractEvent({
        address: '0x7c08ca8bef208ac8be8cd03ad15fbef643dd355c',
        blockNumber: 582975,
        transactionHash: '0x67ed561b9e1842016fda612d1940135465968cd3de0ea7008e7240347fe80bc1',
      }),
    )).toEqual(fromJS({
      pending: {
        2: { txHash: '0x51fda47ac9113cdd7068e9bb7dec55cb170d1ca694afd442f77a56add4b3c86b' },
      },
    }));
  });

  it('should handle tx that was not pending', () => {
    expect(dashboardReducer(
      fromJS({
        pending: {
          2: { txHash: '0x51fda47ac9113cdd7068e9bb7dec55cb170d1ca694afd442f77a56add4b3c86b' },
        },
      }),
      contractEvent({
        address: '0x7c08ca8bef208ac8be8cd03ad15fbef643dd355c',
        blockNumber: 582975,
        transactionHash: '0x67ed561b9e1842016fda612d1940135465968cd3de0ea7008e7240347fe80bc1',
      }),
    )).toEqual(fromJS({
      pending: {
        2: { txHash: '0x51fda47ac9113cdd7068e9bb7dec55cb170d1ca694afd442f77a56add4b3c86b' },
      },
    }));
  });
});
