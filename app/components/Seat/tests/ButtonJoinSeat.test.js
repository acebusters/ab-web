/**
* Created by jzobro 20170529
*/
import React from 'react';
import { mount } from 'enzyme';
import ButtonJoinSeat from '../ButtonJoinSeat';

describe('components.seat.ButtonJoinSeat', () => {
  describe('default state', () => {
    const props = {
      coords: [1, 1],
      onClickHandler: () => {},
      pending: false,
    };
    it('should show "Join" message', () => {
      const el = mount(<ButtonJoinSeat {...props} />);

      expect(el.find('.fa-plus').length).toEqual(1);

      // const la2 = el.findWhere((n) => n.text() === 'Join');
      // expect(la2.length).toEqual(1);
    });
  });

  // describe('after join click', () => {
  //   const props = {
  //     coords: [],
  //     onClickHandler: () => {},
  //     pending: true,
  //   };
  //   it('should render joining animation', () => {
  //     const el = shallow(<ButtonJoinSeat {...props} />);
  //
  //     const la = el.findWhere((n) => n.find('.fa-refresh'));
  //     expect(la.length).toEqual(1);
  //
  //     const la2 = el.findWhere((n) => n.text() === 'Join');
  //     expect(la2.length).toEqual(1);
  //   });
  // });
});
