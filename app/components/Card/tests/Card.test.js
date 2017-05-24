/**
* Created by jzobro 20170524
*/
// import React from 'react';
// import { shallow } from 'enzyme';
// import Card from '../Card';

/* <Card
  cardNumber={holeCards[0]}
  folded={folded}
  size={cardSize}
/> */

describe('components.seat.CardContainer', () => {
  describe('before holeCards are dealt', () => {
    it('should NOT show cardbacks', () => {
      // given props/state
      // what to look for el = shallow();
      // expect();
    });
    it('should NOT show cards', () => {
      // given props/state
      // what to look for el = shallow();
      // expect();
    });
  });

  describe('after holeCards are dealt', () => {
    it('should show cardbacks', () => {});
    it('should NOT show cards', () => {});
  });

  describe('if user folds', () => {
    it('should NOT show cardbacks', () => {});
    it('should NOT show cards', () => {});
  });

  describe('during showdown', () => {
    it('should NOT show cardbacks', () => {});
    it('should show cards', () => {});
  });

  describe('for logged-in user', () => {
    // special cases between logged-in users and other users?
  });

  describe('for other users', () => {
    // special cases between logged-in users and other users?
  });
});
