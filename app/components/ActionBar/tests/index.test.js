/**
 * Testing our Button component
 */

import React from 'react';
import { shallow } from 'enzyme';
import ActionBar from '../index';
import ActionButton from '../ActionButton';

import {
  test1, test2, test3, test4, test5, test6, test7,
} from './tests';

describe(test1.describe, () => {
  it(test1.it, () => {
    const actionBar = shallow(
      <ActionBar {...test1.props} />
    );
    expect(actionBar.find('ActionBarComponent').length).toBe(0);
  });
});

describe(test2.describe, () => {
  it(test2.it, () => {
    const actionBar = shallow(
      <ActionBar {...test2.props} />
    );
    expect(actionBar.find('ActionBarComponent').length).toBe(0);
  });
});

describe(test3.describe, () => {
  it(test3.it, () => {
    const actionBar = shallow(
      <ActionBar {...test3.props} />
    );
    expect(actionBar.find({ name: 'action-bar-wrapper' }).length).toEqual(1);
  });
});

describe(test4.describe, () => {
  it(test4.it, () => {
    const actionBar = shallow(
      <ActionBar {...test4.props} />
    );
    expect(actionBar.find('ActionBarComponent').length).toBe(0);
  });
});

describe(test5.describe, () => {
  it(test5.it, () => {
    const actionBar = shallow(
      <ActionBar {...test5.props} />
    );
    expect(actionBar.find(ActionButton).last().props().text).toBe('FOLD');
  });
});

describe(test6.describe, () => {
  it(test6.it, () => {
    const actionBar = shallow(
      <ActionBar {...test6.props} />
    );
    expect(actionBar.find(ActionButton).length).toBe(2);
  });
});

describe(test7.describe, () => {
  it(test7.it, () => {
    const actionBar = shallow(
      <ActionBar {...test7.props} />
    );
    // actionBar.instance().componentWillReceiveProps(props);
    expect(actionBar.find(ActionButton).first().props().text).toEqual('BET 2000');
  });
});

describe('ActionBar', () => {
  it('should render the RAISE Button with correct min amount', () => {
    const props = {
      active: true,
      amount: 5000,
      state: 'flop',
      params: {
        tableAddr: '0x123',
      },
      isMyTurn: true,
      minRaise: 5000,
      amountToCall: 1000,
      myStack: 10000,
    };
    const actionBar = shallow(
      <ActionBar {...props} />
    );
    // actionBar.instance().componentWillReceiveProps(props);
    expect(actionBar.find(ActionButton).first().props().text).toEqual('RAISE 5000');
  });

  it('should set Bet to all in amount', () => {
    const props = {
      active: true,
      amount: 1750,
      state: 'flop',
      params: {
        tableAddr: '0x123',
      },
      isMyTurn: true,
      myStack: 1750,
      amountToCall: 0,
    };
    const actionBar = shallow(
      <ActionBar {...props} />
    );
    // actionBar.instance().updateamount(2000);
    expect(actionBar.find(ActionButton).first().props().text).toEqual('BET 1750');
  });

  it('should render the Check Button when amount to call is 0', () => {
    const props = {
      active: true,
      state: 'flop',
      params: {
        tableAddr: '0x123',
      },
      isMyTurn: true,
      amountToCall: 0,
    };
    const actionBar = shallow(
      <ActionBar {...props} />
    );
    expect(actionBar.find(ActionButton).nodes[1].props.text).toEqual('CHECK');
  });

  it('should render the Call Button when amount to call is greater 0', () => {
    const props = {
      active: true,
      amount: 1000,
      state: 'preflop',
      params: {
        tableAddr: '0x123',
      },
      isMyTurn: true,
      callAmount: 1000,
      amountToCall: 1000,
      myStack: 2000,
    };
    const actionBar = shallow(
      <ActionBar {...props} />
    );
    expect(actionBar.find(ActionButton).nodes[1].props.text).toEqual('CALL 1000');
  });

  it('should not render the Raise Button if amount to call is bigger than my stack', () => {
    const props = {
      active: true,
      amount: 800,
      state: 'preflop',
      params: {
        tableAddr: '0x123',
      },
      isMyTurn: true,
      callAmount: 800,
      amountToCall: 1000,
      myStack: 800,
    };
    const actionBar = shallow(
      <ActionBar {...props} />
    );
    expect(actionBar.find(ActionButton).nodes[0].props.text).toEqual('CALL 800');
    expect(actionBar.find(ActionButton).nodes.length).toEqual(2);
  });

  it('should disappear after action was taken', () => {
    const props = {
      active: false,
      state: 'flop',
      params: {
        tableAddr: '0x123',
        handId: 1,
      },
      isMyTurn: true,
      amountToCall: 1000,
    };
    const actionBar = shallow(
      <ActionBar {...props} />
    );
    // actionBar.instance().setActive(false);
    expect(actionBar.find('ActionBarComponent').length).toBe(0);
  });
});
