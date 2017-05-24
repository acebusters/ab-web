/**
* Created by jzobro 20170524
*/
// import React from 'react';
// import { shallow } from 'enzyme';
// import SeatTimer from '../SeatTimer';
//
// timerProgress: React.PropTypes.number,
// timerType: React.PropTypes.string, // sitout or action

describe('components.seat.SeatTimer', () => {
  describe('sitout timer', () => {
    it('should display grey sitout timer', () => {});
  });

  describe('action timer', () => {
    describe('with timerProgress <= 60', () => {
      it('should display a "active" color', () => {});
    });
    describe('with timerProgress <= 30', () => {
      it('should display a "warning" color', () => {});
    });
    describe('with timerProgress <= 0', () => {
      it('should display a "danger" color', () => {});
    });
  });
});
