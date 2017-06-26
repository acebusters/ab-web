/**
 * Testing our Button component
 */

import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import ActionBar from '../index';

import * as tests from './tests2';

describe('atTable', () => {
  describe(tests.atTable0.describe, () => {
    it(tests.atTable0.it, () => {
      const actionBar = shallow(
        <ActionBar {...tests.atTable0.props} />
      );
      expect(actionBar.find('ActionBarComponent').length).toBe(0);
    });
  });

  describe(tests.atTable1.describe, () => {
    const actionBar = shallow(
      <ActionBar {...tests.atTable1.props} />
    );
    it(tests.atTable1.it, () => {
      expect(actionBar.find({ name: 'action-bar-wrapper' }).length).toBe(1);
    });
    it('should not be clickable', () => {
      actionBar.find('ControlCheckCall').simulate('click');
      sinon.assert.notCalled(
        tests.atTable1.props.handleCheck
      );
    });
  });

  describe(tests.atTable2.describe, () => {
    const actionBar = mount(
      <ActionBar {...tests.atTable2.props} />
    );
    it(tests.atTable2.it, () => {
      expect(actionBar.find({ name: 'action-bar-wrapper' }).length).toBe(1);
    });
    it('should render as expected', () => {
      expect(actionBar.find('ControlCheckCall').length).toBe(1);
      expect(actionBar.find('ControlBetRaise').length).toBe(1);
    });
    it('should be clickable', () => {
      // simulating mouseup here, as the modified props
      // already simulate a mouseDown by setting the
      // 'buttonActive' prop to 'CHECK' in this case
      actionBar.find('ControlCheckCall').simulate('mouseUp');
      sinon.assert.calledOnce(
        tests.atTable2.props.handleCheck
      );
    });
  });
});

describe(tests.amountToCheck.describe, () => {
  const actionBar = mount(<ActionBar {...tests.amountToCheck.props} />);
  it(tests.amountToCheck.it, () => {
    expect(actionBar.find({ name: 'button-blank' }).length).toEqual(1);
    expect(actionBar.find({ name: 'button-check' }).length).toEqual(1);
    expect(actionBar.find({ name: 'button-bet' }).length).toEqual(1);
  });
});

describe(tests.amountToCall0.describe, () => {
  it(tests.amountToCall0.it, () => {
    const actionBar = mount(
      <ActionBar {...tests.amountToCall0.props} />
    );
    expect(actionBar.find({ name: 'button-fold' }).length).toEqual(1);
    expect(actionBar.find({ name: 'button-call' }).length).toEqual(1);
    expect(actionBar.find({ name: 'button-raise' }).length).toEqual(1);
  });
});

describe(tests.amountToCall1.describe, () => {
  it(tests.amountToCall1.it, () => {
    const actionBar = mount(
      <ActionBar {...tests.amountToCall1.props} />
    );
    expect(actionBar.find({ name: 'button-fold' }).length).toEqual(1);
    expect(actionBar.find({ name: 'button-call' }).length).toEqual(0);
    expect(actionBar.find({ name: 'button-blank' }).length).toEqual(1);
    expect(actionBar.find({ name: 'button-all-in' }).length).toEqual(1);
  });
});

/*
describe(tests[5].describe, () => {
  it(tests[5].it, () => {
    const actionBar = shallow(
      <ActionBar {...tests[5].props} />
    );
    expect(actionBar.find('ButtonFold').html()).toContain('blank');
    expect(actionBar.find('ButtonCheckCall').length).toBe(1);
    expect(actionBar.find('ButtonBetRaise').length).toBe(1);
  });
});

describe(tests[6].describe, () => {
  it(tests[6].it, () => {
    const actionBar = mount(
      <ActionBar {...tests[6].props} />
    );
    expect(actionBar.find('ButtonFold').html()).toContain('blank');
    expect(actionBar.find('ButtonCheckCall').length).toBe(1);
    expect(actionBar.find('ButtonBetRaise').html()).toContain('BET 2000');
  });
});

describe(tests[7].describe, () => {
  it(tests[7].it, () => {
    const actionBar = mount(
      <ActionBar {...tests[7].props} />
    );
    expect(actionBar.find('ButtonFold').html()).toContain('FOLD');
    expect(actionBar.find('ButtonCheckCall').length).toBe(1);
    expect(actionBar.find('ButtonBetRaise').html()).toContain('RAISE 5000');
  });
});

describe(tests[8].describe, () => {
  it(tests[8].it, () => {
    const actionBar = mount(
      <ActionBar {...tests[8].props} />
    );
    expect(actionBar.find('ButtonFold').html()).toContain('blank');
    expect(actionBar.find('ButtonCheckCall').length).toBe(1);
    expect(actionBar.find('ButtonBetRaise').html()).toContain('BET 1750');
  });
});

describe(tests[9].describe, () => {
  it(tests[9].it, () => {
    const actionBar = shallow(
      <ActionBar {...tests[9].props} />
    );
    expect(actionBar.find('ButtonFold').html()).toContain('blank');
    expect(actionBar.find('ButtonCheckCall').html()).toContain('CHECK');
    expect(actionBar.find('ButtonBetRaise').length).toBe(1);
  });
});

describe(tests[10].describe, () => {
  it(tests[10].it, () => {
    const actionBar = shallow(
      <ActionBar {...tests[10].props} />
    );
    expect(actionBar.find('ButtonCheckCall').html()).toContain('CALL 1000');
  });
});

describe(tests[11].describe, () => {
  it(tests[11].it, () => {
    const actionBar = mount(
      <ActionBar {...tests[11].props} />
    );

    expect(actionBar.find('ButtonFold').length).toBe(1);
    expect(actionBar.find('ButtonCheckCall').html()).toContain('CALL 800');
    expect(actionBar.find('ButtonBetRaise').html()).toContain('blank');
    expect(actionBar.find('ButtonBetRaise').html()).not.toContain('RAISEj');
  });
});

describe(tests[12].describe, () => {
  it(tests[12].it, () => {
    const actionBar = shallow(
      <ActionBar {...tests[12].props} />
    );
    // actionBar.instance().setActive(false);
    expect(actionBar.find('ActionBarComponent').length).toBe(0);
  });
});
*/
