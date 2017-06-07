/**
* Created by jzobro 20170605
*/
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import TableMenu from '../index';
import { blocky } from '../../../app.config';

describe('components.TableMenu.TableMenu', () => {
  describe('if guest', () => {
    const props = {
      loggedIn: false,
      active: false,
      nickName: null,
      blocky: null,
    };
    describe('if menu closed', () => {
      const newProps = Object.assign(props, { open: false });
      const el = mount(<TableMenu {...newProps} />);

      it('should display default components', () => {
        expect(el.find({ name: 'logo-wrapper' }).length).toEqual(1);
      });

      it('should display guest header', () => {
        expect(el.find({ name: 'item-title' }).length).toEqual(1);
        expect(el.find({ name: 'item-title' }).text()).toEqual('Guest');
        expect(el.find({ name: 'identicon' }).length).toEqual(1);
      });

      it('should display closed menu', () => {
        expect(el.find({ name: 'sitout' }).length).toEqual(1);
        expect(el.find({ name: 'standup' }).length).toEqual(1);
      });
    });

    describe('if menu open', () => {
      const newProps = Object.assign(props, { open: true });
      const el = mount(<TableMenu {...newProps} />);

      it('should display default components', () => {
        expect(el.find({ name: 'logo-wrapper' }).length).toEqual(1);
      });

      it('should display guest header', () => {
        expect(el.find({ name: 'item-title' }).length).toEqual(1);
        expect(el.find({ name: 'item-title' }).text()).toEqual('Guest');
        expect(el.find({ name: 'identicon' }).length).toEqual(1);
      });

      it('should display guest menu', () => {
        expect(el.find({ name: 'lobby' }).length).toEqual(1);
        expect(el.find({ name: 'register' }).length).toEqual(1);
        expect(el.find({ name: 'signin' }).length).toEqual(1);
      });
    });
  });

  describe('if user', () => {
    const props = {
      loggedIn: true,
      active: false,
      nickName: 'DAWN',
      blocky,
    };
    describe('if menu closed', () => {
      const newProps = Object.assign(props, { open: false });
      const el = mount(<TableMenu {...newProps} />);

      it('should display default components', () => {
        expect(el.find({ name: 'logo-wrapper' }).length).toEqual(1);
      });

      it('should display user header', () => {
        expect(el.find({ name: 'item-title' }).text()).toEqual(props.nickName);
        expect(el.find({ name: 'identicon' }).length).toEqual(1);
      });

      it('should display closed menu', () => {
        expect(el.find({ name: 'sitout' }).length).toEqual(1);
        expect(el.find({ name: 'standup' }).length).toEqual(1);
      });
    });

    describe('if menu open', () => {
      const newProps = Object.assign(props, { open: true });
      const el = mount(<TableMenu {...newProps} />);

      it('should display default components', () => {
        expect(el.find({ name: 'logo-wrapper' }).length).toEqual(1);
      });

      it('should display user header', () => {
        expect(el.find({ name: 'item-title' }).text()).toEqual(props.nickName);
        expect(el.find({ name: 'identicon' }).length).toEqual(1);
      });

      it('should display open user menu', () => {
        expect(el.find({ name: 'lobby' }).length).toEqual(1);
        expect(el.find({ name: 'dashboard' }).length).toEqual(1);
        expect(el.find({ name: 'preferences' }).length).toEqual(1);
        expect(el.find({ name: 'logout' }).length).toEqual(1);
      });
    });
  });

  describe('mouse actions on header', () => {
    const props = {
      loggedIn: true,
      active: false,
      nickName: 'DAWN',
      blocky,
      toggleMenuOpen: sinon.spy(),
      toggleMenuActive: sinon.spy(),
    };
    const el = mount(<TableMenu {...props} />);
    describe('if user clicks header', () => {
      it('should call toggleMenuOpen func', () => {
        el.find('MenuHeader').simulate('click');
        sinon.assert.calledOnce(props.toggleMenuOpen);
      });
    });
    describe('if user mouseDown header', () => {
      it('should call toggleMenuActive func', () => {
        el.find('MenuHeader').simulate('mouseDown');
        sinon.assert.calledOnce(props.toggleMenuActive);
        props.toggleMenuActive.reset();
      });
    });
    describe('if user mouseUp header', () => {
      it('should call toggleMenuActive func', () => {
        el.find('MenuHeader').simulate('mouseUp');
        sinon.assert.calledOnce(props.toggleMenuActive);
        props.toggleMenuActive.reset();
      });
    });
  });
});
