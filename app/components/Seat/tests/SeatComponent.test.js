import React from 'react';
import { shallow } from 'enzyme';
import SeatComponent from '../index';

describe('components.seat.seatComponent', () => {
  describe('if seat is open', () => {
    // beforeEach(() => {});
    describe('if not joined table', () => {
      it('should render <ButtonJoinSeat />', () => {
        // given
        const el = shallow(<SeatComponent open />);
        // what to look for el = shallow();
        // expect();
        expect(el.find('ButtonJoinSeat').length).toEqual(1);
      });
    });
    describe('if joined table', () => {
      it('should render <ButtonInvite />', () => {
        // given
        // what to look for el = shallow();
        // expect();
      });
    });
  });

  describe('if seat is occupied', () => {
    // beforeEach(() => {});
    describe('if logged-in user seat', () => {
      it('should render <Seat /> for logged-in user', () => {
        // what to look for el = shallow();
        // expect();
      });
    });
    describe('if other user seat', () => {
      it('should render <Seat /> for other user', () => {
        // what to look for el = shallow();
        // expect();
      });
    });
  });
});
