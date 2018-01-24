import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSignerAddrSelector,
  makeBlockySelector,
  makeNickNameSelector,
  makeSelectLoggedIn,
  makeSelectGenerated,
} from '../AccountProvider/selectors';
import { setAuthState } from '../AccountProvider/actions';
import { getHeaderCollapsed } from './selectors';
import { setCollapsed } from './actions';
import * as localStorage from '../../services/localStorage';

import Header from '../../components/Header';

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    localStorage.removeItem('wallet');
    return dispatch(setAuthState({ loggedIn: false }));
  },
  setCollapsed: (val) => dispatch(setCollapsed(val)),
});

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  signerAddr: makeSignerAddrSelector(),
  nickName: makeNickNameSelector(),
  blocky: makeBlockySelector(),
  accountIsGenerated: makeSelectGenerated(),
  collapsed: getHeaderCollapsed(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
