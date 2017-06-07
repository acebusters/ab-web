/**
* Created by jzobro 20170605
*/
import React from 'react';
import { mount } from 'enzyme';
import TableMenu from '../index';
import {
  // STATUS_MSG
  // signerAddr,
} from '../../../app.config';

describe('components.TableMenu.TableMenu', () => {
  describe('if guest', () => {
    const props = {
      account: { loggedIn: false },
    };
    const el = mount(<TableMenu {...props} />);
    it('should display default components', () => {
      expect(el.find({ name: 'logo-wrapper' }).length).toEqual(1);
    });

    it('should display guest menu', () => {
      expect(el.find({ name: 'item-title' }).text()).toEqual('Register');
      expect(el.find({ name: 'lobby' }).length).toEqual(1);
      expect(el.find({ name: 'signin' }).length).toEqual(1);
    });
  });

  /*
  // These tests are blocked by the blockies service.
  // Need to simulate with Nock?
  describe('if user', () => {
    const props = {
      account: { loggedIn: true },
      signerAddr,
    };
    const el = mount(<TableMenu {...props} />);
    it('should display default components', () => {
      expect(el.find({ name: 'logo-wrapper' }).length).toEqual(1);
    });
    it('should display user menuClose', () => {
      expect(el.find({ name: 'toggle-menu-button' }).length).toEqual(1);
      expect(el.find({ name: 'sitout' }).length).toEqual(1);
      expect(el.find({ name: 'standup' }).length).toEqual(1);
    });
    describe('if menu open', () => {
      it('should toggle user menu open', () => {});
    });
    describe('if menu closed', () => {
      it('should toggle user menu closed', () => {});
    });
  });
  describe('menu actions', () => {
    describe('if user clicks menu when closed', () => {
      it('should open menu', () => {});
    });
    describe('if user clicks menu when open', () => {
      it('should close menu', () => {});
    });
    describe('if user mouseDown menu', () => {
      it('should render active menu state', () => {});
    });
    describe('if user mouseUp menu', () => {
      it('should remove active menu state', () => {});
    });
  });
  */
});
