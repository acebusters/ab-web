import React from 'react';
import { shallow } from 'enzyme';
import Pot, { Chip } from '../index';

describe('calculateChipStacks()', () => {
  it('Should calculate the right amount of chips', () => {
    const renderedComponent = shallow(
      <Pot potSize={5501} right="0%" left="0%" />
    );
    expect(renderedComponent.find(Chip).length).toBe(3);
  });

  it('Should not show up when potsize is 0', () => {
    const renderedComponent = shallow(
      <Pot potSize={0} right="0%" left="0%" />
    );
    expect(renderedComponent.children().length).toBe(0);
  });
});
