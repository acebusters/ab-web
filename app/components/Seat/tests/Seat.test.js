/**
* Created by jzobro 20170524
*/
import React from 'react';
import { shallow } from 'enzyme';
import Seat from '../Seat';

describe('components.seat.seat', () => {
  describe('seat status', () => {
    describe('if seat is NOT ready', () => {
      it('should show seat status', () => {
        // given props/state
        // what to look for el = shallow();
        // expect();
      });

      describe('if seat is ready', () => {
        it('should show <CardContainer/>', () => {
          // given props/state
          // what to look for el = shallow();
          // expect();
        });
      });
    });
  });


  describe('Seat Info', () => {
    it('should show <SeatInfo/>', () => {
      const el = shallow(<Seat />);
      expect(el.find('SeatInfo').length).toEqual(1);
    });
  });

  describe('last action status', () => {
    describe('if no last action is undefined', () => {
      it('should not show <StatusAction/>', () => {
        // given props/state
        // what to look for el = shallow();
        // expect();
      });
    });

    describe('if last action is not !undefined', () => {
      it('should show <StatusAction/>', () => {
        // given props/state
        // what to look for el = shallow();
        // expect();
      });
    });
  });

  describe('timer', () => {
    describe('when NOT players turn to act, or NOT in sitout', () => {
      it('should NOT show <SeatTimer />', () => {
        // given props/state
        // what to look for el = shallow();
        // expect();
      });
    });

    describe('when players turn to act', () => {
      it('should show <SeatTimer />', () => {
        // given props/state
        // what to look for el = shallow();
        // expect();
      });
    });

    describe('if player is in sitout', () => {
      it('should show <SeatTimer />', () => {
        // given props/state
        // what to look for el = shallow();
        // expect();
      });
    });
  });
});
