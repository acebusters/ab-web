import React from 'react';
import { shallow } from 'enzyme';
import SeatComponent from '../index';

describe('components.seat.seatComponent', () => {
  describe('if seat is open', () => {
    const props = { open: true };

    describe('if not joined table', () => {
      it('should render <ButtonJoinSeat />', () => {
        const el = shallow(
          <SeatComponent
            /* TODO: prop for joined table */
            {...props}
          />
        );
        expect(el.find('ButtonJoinSeat').length).toEqual(1);
      });
    });

    describe('if joined table', () => {
      it('should render <ButtonInvite />', () => {
        // const el = shallow(
        //   <SeatComponent
        //     /* TODO: !prop for joined table */
        //     {...props}
        //   />
        // );
        // expect(el.find('ButtonInvite').length).toEqual(1);
      });
    });
  });

  describe('if seat is occupied', () => {
    // const props = { open: false };

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
